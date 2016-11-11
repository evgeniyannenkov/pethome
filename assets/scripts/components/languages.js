"use strict";

function languagesComponentsInit ( module, constants ) {

    module.component('language', {
        templateUrl : `${constants.templatesFolder}/languages-select.html`,
        bindings : {
            languageSelect : "="
        },
        controller : "translationCtrl",
        controllerAs : "translator"
    });
}
