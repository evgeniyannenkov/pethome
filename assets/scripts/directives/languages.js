"use strict";

function languagesDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('languageSelect', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/languages-select.html`,
                controller : "translationCtrl",
                controllerAs : "translator"
            };
        }
    ]);
}
