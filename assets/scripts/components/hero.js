"use strict";

function heroComponentsInit ( module, common ) {
    module.component("hero", {
        templateUrl : common.getTemplatePath("hero"),
        controllerAs : "hero"
    });
}