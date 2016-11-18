"use strict";

function popupComponentsInit ( module, constants ) {

    module.component('popup', {
        transclude : {
            "trigger" : "popupTrigger",
            "content" : "popupContent"
        },
        templateUrl : `${constants.templatesFolder}/popup.html`,
        bindings : {
            type : "@",
            wide: "="
        },
        controller : "popupCtrl",
        controllerAs : "popup"
    });
}
