"use strict";

function languagesComponentsInit ( module, common ) {

    module.component('language', {
        templateUrl : common.getTemplatePath("languages-select"),
        bindings : {
            languageSelect : "="
        },
        controller : "translationCtrl",
        controllerAs : "translator"
    });
}
