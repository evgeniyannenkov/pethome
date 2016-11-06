"use strict";

function appFiltersInit ( module ) {
    module.filter("feed", () => {
        return ( adverts, authors ) => {
            let allowed = [];

            angular.forEach(adverts, ( advert ) => {

                if ( authors && !authors[ advert.author ].blocked && advert.published ) {
                    allowed.push(advert);
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
}

