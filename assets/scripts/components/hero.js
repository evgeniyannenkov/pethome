"use strict";

function heroComponentsInit ( module, constants ) {

    module.component("heroSection", {
            templateUrl : `${constants.templatesFolder}/section-hero.html`,
            controllerAs : "hero"
        }
    );
}