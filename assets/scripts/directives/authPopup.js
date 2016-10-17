"use strict";

function authPopupDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('authPopup', [
        "$http",
        function ( ajax ) {

            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/authPopup.html`,
                scope : {
                    popup : "="
                }
            };
        }
    ]);
}
