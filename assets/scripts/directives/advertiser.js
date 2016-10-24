"use strict";

function advertiserDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('advertiser', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/advertiser-data.html`,
                scope : {
                    user_id : "@advertiser",
                    edit : "="
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
}
