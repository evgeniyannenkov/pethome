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
            function translationFilter ( content, words = 20 ) {

                let contentArray = content.split(" ");

                if ( contentArray.length > words ) {
                    return contentArray.slice(0, words).join(" ") + " ...";
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

                if(!days) return pets;

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

