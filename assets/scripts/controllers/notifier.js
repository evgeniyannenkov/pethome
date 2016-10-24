"use strict";

function notifierControllersInit ( module ) {

    module.controller('notifierCtrl', [
        "notify", "$scope",
        function ( notify, $scope ) {

            this.close = () => {
                notify.active = false;
            };

            $scope.$watch(() => {
                return notify.active;
            }, ( active ) => {
                this.state = false;
                this.message = notify.message;
                this.active = active;
                this.state = notify.state;
            });
        }
    ]);
}
