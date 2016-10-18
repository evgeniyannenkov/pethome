"use strict";

function advertDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('advertsFeed', [
        function () {

            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/advertsFeed.html`,
                scope : {
                    user_id : "@advertsFeed"
                }
            };
        }
    ]);

    module.directive('advert', [
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
