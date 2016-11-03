"use strict";

function formComponentsInit ( module, constants ) {

    module.component("popupForm", {
        templateUrl : `${constants.templatesFolder}/popup-form.html`,
        require : {
            popup : "^^?popup"
        },
        bindings : {
            name: "@"
        },
        transclude : true,
        controllerAs : "form"
    });
}