"use strict";

function authComponentsInit ( module, constants ) {

    module.component("authForm", {
        templateUrl : `${constants.templatesFolder}/auth.html`,
        require : {
            popup : "^^?popup"
        },
        bindings : {
            form : "@",
            title : "@"
        },
        controller: "authCtrl",
        controllerAs : "auth"
    });

    module.component("resetPassword", {
        templateUrl : `${constants.templatesFolder}/reset-password.html`,
        require : {
            popup : "^^popupContent"
        },
        bindings : {
            form : "@",
            title : "@"
        },
        controller: "resetPassCtrl",
        controllerAs : "reset"
    });

}