"use strict";

function notifierComponentsInit ( module, common ) {

    module.component('notify', {
        templateUrl : common.getTemplatePath("notify"),
        controller : "notifierCtrl",
        controllerAs : "notifier"
    });
}
