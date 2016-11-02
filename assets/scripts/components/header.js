"use strict";

function headerComponentsInit ( module, constants ) {

    module.component("burgerButton", {
        templateUrl : `${constants.templatesFolder}/burger-button.html`,
        controllerAs : "btn"
    });

}