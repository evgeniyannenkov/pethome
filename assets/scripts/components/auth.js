"use strict";

function authComponentsInit ( module, constants ) {

    module.component("authForm", {
        templateUrl : `${constants.templatesFolder}/auth.html`,
        require : {
            popup : "^^?popup",
            form : "^^?form"
        },
        bindings : {
            form : "@",
            title : "@"
        },
        controller: "authCtrl",
        controllerAs : "auth"
    });

}