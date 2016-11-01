"use strict";

function languagesComponentsInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.component('language', {
        templateUrl : `${templatesFolder}/languages-select.html`,
        controller : "translationCtrl",
        controllerAs : "translator"
    });
}
