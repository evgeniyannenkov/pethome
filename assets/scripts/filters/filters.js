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
        "$translator", "$rootScope",
        function ( translator, $rootScope ) {
            function translationFilter ( content ) {
                return translator.translate(content);
            }

            translationFilter.$stateful = true;

            return translationFilter;
        }
    ]);
}

