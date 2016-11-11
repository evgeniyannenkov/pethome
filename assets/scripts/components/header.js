"use strict";

function headerComponentsInit ( module, constants ) {

    module.component("header", {
        templateUrl : `${constants.templatesFolder}/header.html`,
        controller : "headerCtrl",
        controllerAs : "header",
        bindings : {
            user : "@userId",
            isAdmin : "="
        }
    });

    module.component("burgerButton", {
        templateUrl : `${constants.templatesFolder}/burger-button.html`,
        require : {
            header : "^^?header"
        },
        controller: "headerBtnCtrl",
        controllerAs : "btn"
    });

}