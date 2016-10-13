"use strict";

function advertDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('advertPost', [
        "$http",
        function ( ajax ) {

            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/advert.html`,
                scope : {
                    advert : "="
                }
            };
        }
    ]);
}
