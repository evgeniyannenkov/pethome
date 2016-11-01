"use strict";

function notifierComponentsInit (  module, constants  ) {

    module.component('notify', {
        templateUrl : `${constants.templatesFolder}/notify.html`,
        controller : "notifierCtrl",
        controllerAs : "notifier"
    });
}
