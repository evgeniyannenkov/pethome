"use strict";

function formComponentsInit ( module ) {

    const templatesFolder = "/assets/templates";

    module.component("popupForm", {
        templateUrl : `${templatesFolder}/popup-form.html`,
        require : {
            popup: "^^?popup"
        },
        transclude : true,
        controllerAs : "form"
    });
}