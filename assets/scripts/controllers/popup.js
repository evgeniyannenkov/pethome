"use strict";

function popupControllersInit ( module ) {

    module.controller('popupCtrl', [
        "$http",
        function ( $http ) {
        console.log(123);
        }
    ])
}