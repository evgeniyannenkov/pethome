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
        function () {

            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/advert.html`,
                scope : {
                    advert : "="
                }
            };
        }
    ]);

    module.directive('advertSingle', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/edit-advert.html`,
                scope : {
                    advert_id : "@advertSingle"
                },
                controller : "editAdvertCtrl",
                controllerAs : "advertEditor"
            };
        }
    ]);
}
