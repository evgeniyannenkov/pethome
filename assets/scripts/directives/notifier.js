"use strict";

function notifierDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('notify', [
        function () {

            return {
                restrict : 'AE',
                templateUrl : `${templatesFolder}/notify.html`,
                controller : "notifierCtrl",
                controllerAs : "notifier"
            };
        }
    ]);
}
