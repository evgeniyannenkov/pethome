"use strict";

function formComponentsInit ( module, constants ) {

    module.component("popupForm", {
            templateUrl : `${constants.templatesFolder}/popup-form.html`,
            require : {
                popup : "^^?popup"
            },
            bindings : {
                name : "@",
                label: "@",
                submitFunction : "&"
            },
            transclude : true,
            controller : "formCtrl",
            controllerAs : "form",
        }
    );

    module.component("formInput", {
        templateUrl : `${constants.templatesFolder}/form-parts/form-input.html`,
        require : {
            form : "^^?popupForm"
        },
        bindings : {
            type : "@",
            name : "@",
            required : "@",
            value: "="
        },
        controller : "formFieldCtrl",
        controllerAs : "field"
    });
}