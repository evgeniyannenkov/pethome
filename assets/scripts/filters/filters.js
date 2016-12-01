"use strict";

function appFiltersInit ( module ) {
    module.filter("feed", () => {
        return ( pets, authors ) => {
            let allowed = [];

            angular.forEach(pets, ( pet ) => {

                if ( authors && !authors[ pet.author ].blocked && pet.published ) {
                    allowed.push(pet);
                }

            });

            return allowed;
        };
    });

    module.filter("translate", [
        "$translator", "$filter",
        function ( translator, $filter ) {
            let method;

            function translationFilter ( content, type ) {

                switch ( type ) {
                    case "matches" : {
                        method = "translateAllMatches";
                        break;
                    }
                    case "all" : {
                        method = "translateAll";
                        break;
                    }
                    case "date" : {
                        return $filter("date")(content, translator.getDateFormat());
                    }
                    case "time" : {
                        return $filter("date")(content, translator.getTimeFormat());
                    }
                    case "fullDate" : {
                        return $filter("date")(content, translator.getFullDateFormat());
                    }
                    default : {
                        method = "translate";
                        break;
                    }
                }

                return translator[ method ](content);
            }

            translationFilter.$stateful = true;

            return translationFilter;
        }
    ]);

    module.filter("excerpt", [
        function () {
            function translationFilter ( content, words = 20, startWith ) {
                let contentArray,
                    prefix = "... ",
                    postfix = " ...",
                    startIndex,
                    slicedArray;

                content = content.trim().replace(/\s\s+/g, ' ');
                contentArray = content.substr(0, content.length).split(" ");

                if ( contentArray.length > words ) {
                    slicedArray = contentArray.slice(0, words);
                    startIndex = startWith && content.indexOf(startWith) != -1 ? content.indexOf(startWith) : 0;
                    if ( startWith && startIndex + startWith.length > slicedArray.join(" ").length ) {
                        contentArray = content.substr(startIndex, content.length - startIndex).split(" ");
                        slicedArray = contentArray.slice(0, words);
                    } else {
                        prefix = "";
                    }
                    if ( content.substring(startIndex, content.length) == slicedArray.join(" ") ) {
                        postfix = "";
                    }
                    return prefix + slicedArray.join(" ") + postfix;
                } else {
                    return content;
                }
            }

            return translationFilter;
        }
    ]);

    module.filter("dateRange", [
        function () {
            function translationFilter ( pets, days ) {

                let time = days * 24 * 60 * 60 * 1000,
                    currentTime = Date.now();

                if ( !days ) {
                    return pets;
                }

                if ( pets ) {
                    return pets.filter(( pet ) => {
                        if ( pet.publicationDate > currentTime - time ) {
                            return pet;
                        }
                    });
                }
            }

            return translationFilter;
        }
    ]);
}

