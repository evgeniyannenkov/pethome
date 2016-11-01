"use strict";

function popupComponentsInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.component('popup', {
        transclude : {
            "trigger" : "popupTrigger",
            "content" : "popupContent"
        },
        templateUrl : `${templatesFolder}/popup.html`,
        bindings : {
            type : "@"
        },
        controller : "popupCtrl",
        controllerAs : "popup"
    });
}
