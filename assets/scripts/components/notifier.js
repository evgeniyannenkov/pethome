"use strict";

function notifierComponentsInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.component('notify', {
        templateUrl : `${templatesFolder}/notify.html`,
        controller : "notifierCtrl",
        controllerAs : "notifier"
    });
}
