"use strict";

function popupControllersInit ( module ) {

    module.controller('popupCtrl', [
        function () {

            this.close = () => {
                this.active = false;
            }

        }
    ]);
}