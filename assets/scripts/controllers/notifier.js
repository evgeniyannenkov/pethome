"use strict";

function notifierControllersInit ( module ) {

    module.controller('notifierCtrl', [
        "notify", "$scope", "$sce",
        function ( notify, $scope, $sce ) {

            this.close = () => {
                notify.active = false;
            };

            $scope.$watch(() => {
                return notify.active;
            }, ( active ) => {
                this.state = false;
                this.message = $sce.trustAsHtml(notify.message);
                this.active = active;
                this.state = notify.state;
            });
        }
    ]);
}
