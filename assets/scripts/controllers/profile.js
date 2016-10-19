"use strict";

function profileControllersInit ( module ) {

    module.controller('profileSettingsCtrl', [
        "advertiser", function (advertiser) {
            console.log(123);
            advertiserService.test();
        }
    ]);
}