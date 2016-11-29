"use strict";

function headerComponentsInit ( module, common ) {

    module.component("header", {
        templateUrl : common.getTemplatePath("header"),
        controller : "headerCtrl",
        controllerAs : "header",
        bindings : {
            user : "@userId",
            isAdmin : "="
        }
    });

    module.component("burgerButton", {
        templateUrl : common.getTemplatePath("burger-button"),
        require : {
            header : "^^?header"
        },
        controller: "headerBtnCtrl",
        controllerAs : "btn"
    });

}