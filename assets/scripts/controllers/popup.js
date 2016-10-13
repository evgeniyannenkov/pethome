"use strict";

function popupControllersInit ( module ) {

    module.controller('popupCtrl', [
        "$http",
        function ( $http ) {

            this.popup = () => {
                console.log(12345);
            }

        }
    ])
}