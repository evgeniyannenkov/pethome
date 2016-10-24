"use strict";

function advertiserDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('advertiser', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/advertiser.html`,
                scope : {
                    user_id : "@advertiser"
                },
                controller : "advertiserCtrl",
                controllerAs : "advertiser"
            };
        }
    ]);
}
