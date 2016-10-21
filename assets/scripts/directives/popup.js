"use strict";

function popupDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('popup', [
        function (  ) {

            return {
                restrict : 'A',
                transclude : {
                    "trigger" : "popupTrigger",
                    "content" : "popupContent"
                },
                templateUrl : `${templatesFolder}/popup.html`,
                scope : {
                    type : "@"
                },
                controller : "popupCtrl",
                controllerAs : "popup"
            };
        }
    ]);
}
