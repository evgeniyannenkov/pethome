"use strict";

function authComponentsInit ( module, common ) {

    module.component("authForm", {
        templateUrl : common.getTemplatePath("auth"),
        require : {
            popup : "^^?popup"
        },
        bindings : {
            form : "@",
            title : "@"
        },
        controller : "authCtrl",
        controllerAs : "auth"
    });

    module.component("resetPassword", {
        templateUrl : common.getTemplatePath("reset-password"),
        require : {
            popup : "^^popupContent"
        },
        bindings : {
            form : "@",
            title : "@"
        },
        controller : "resetPassCtrl",
        controllerAs : "reset"
    });

}