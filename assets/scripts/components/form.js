"use strict";

function formComponentsInit ( module, constants ) {

    module.component("popupForm", {
        templateUrl : `${constants.templatesFolder}/popup-form.html`,
        require : {
            popup : "^^?popup"
        },
        transclude : true,
        controllerAs : "form"
    });
}