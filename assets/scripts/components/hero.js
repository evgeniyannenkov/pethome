"use strict";

function heroComponentsInit ( module, constants ) {
    module.component("hero", {
        templateUrl : `${constants.templatesFolder}/hero.html`,
        controllerAs : "hero"
    });
}