"use strict";

function formComponentsInit ( module, common ) {

    module.component("popupForm", {
            templateUrl : common.getTemplatePath("popup-form"),
            require : {
                popup : "^^?popupContent"
            },
            bindings : {
                name : "@",
                label : "@",
                submitFunction : "&"
            },
            transclude : true,
            controller : "formCtrl",
            controllerAs : "form",
        }
    );

    module.component("formInput", {
        templateUrl : common.getTemplatePath("form-parts/form-input"),
        require : {
            form : "^^?popupForm"
        },
        bindings : {
            type : "@",
            name : "@",
            required : "@",
            value : "=",
            min : "@",
            max : "@"
        },
        controller : "formFieldCtrl",
        controllerAs : "field"
    });

    module.component("formTextarea", {
        templateUrl : common.getTemplatePath("form-parts/form-textarea"),
        require : {
            form : "^^?popupForm"
        },
        bindings : {
            type : "@",
            name : "@",
            required : "@",
            value : "="
        },
        controller : "formFieldCtrl",
        controllerAs : "field"
    });

    module.component("resetForm", {
        templateUrl : common.getTemplatePath("reset"),
        controller : function () {
        }
    });
}