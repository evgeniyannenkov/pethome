"use strict";

function popupDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('popup', [
        "$http",
        function ( ajax ) {

            return {
                restrict : 'A',
                transclude : {
                    "trigger" : "popupTrigger",
                    "content" : "popupContent"
                },
                templateUrl : `${templatesFolder}/popup.html`,
                scope : {
                    popup : "=",
                    type : "@"
                },
            };
        }
    ]);
}
