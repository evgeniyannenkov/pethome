"use strict";

function advertDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('advertsFeed', [
        function () {

            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/adverts-feed.html`,
                scope : {
                    user_id : "@advertsFeed",
                    filter_enabled : "=enableFilter"
                },
                controller : "advertsFeedCtrl",
                controllerAs : "feed"
            };
        }
    ]);

    module.directive('advertsFilter', [
        function () {

            return {
                restrict : 'AE',
                templateUrl : `${templatesFolder}/adverts-filter.html`,
                scope : {
                    filter_fields : "=feedFilter"
                },
                controller : "advertsFeedFilterCtrl",
                controllerAs : "filter"
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
