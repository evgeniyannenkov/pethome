"use strict";

function notifierControllersInit ( module ) {

    module.controller('notifierCtrl', [
        "notify", "$scope", "$sce",
        function ( notify, $scope, $sce ) {

            this.messages = notify.messages;

        }
    ]);
}
