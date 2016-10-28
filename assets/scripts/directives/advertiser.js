"use strict";

function advertiserDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('advertiser', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/advertiser.html`,
                scope : {
                    user_id : "@advertiser",
                    edit : "=",
                    remove: "="
                },
                controller : "advertiserCtrl",
                controllerAs : "advertiser"
            };
        }
    ]);

    module.directive('advertiserEdit', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/advertiser-edit.html`,
                scope : {
                    user : "=advertiserEdit",
                    popupClose : "&"
                },
                controller : "advertiserEditCtrl",
                controllerAs : "editor"
            };
        }
    ]);

    module.directive('advertiserRemove', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/advertiser-remove.html`,
                scope : {
                    user : "=advertiserRemove",
                    popupClose : "&popupClose"
                },
                controller : "advertiserRemoveCtrl",
                controllerAs : "remover"
            };
        }
    ]);
}
