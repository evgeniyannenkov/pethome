"use strict";

function advertDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.component('feed', {
        templateUrl : `${templatesFolder}/adverts-feed.html`,
        bindings : {
            id : "@userId",
            filter_enabled : "=enableFilter",
            hideFields : "="
        },
        controller : "advertsFeedCtrl",
        controllerAs : "feed"
    } );

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
                    advert : "=",
                    author : "=advertAuthor",
                    hide : "=hideFields"
                }
            };
        }
    ]);

    module.directive('advertSingle', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/advert-single.html`,
                scope : {
                    advert_id : "@advertSingle"
                },
                controller : "advertCtrl",
                controllerAs : "advert"
            };
        }
    ]);

    module.directive('advertEdit', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/advert-edit.html`,
                scope : {
                    advertData : "=advertEdit",
                    popupClose : "&popupClose",
                    advertUpdate : "&advertUpdate"
                },
                controller : "editAdvertCtrl",
                controllerAs : "advertEditor"
            };
        }
    ]);
}
