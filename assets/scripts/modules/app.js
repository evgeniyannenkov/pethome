"use strict";

function getModules () {
    return {
        services : angular.module("services", []),
        notifier : angular.module("notifier", []),
        auth : angular.module("auth", []),
        popup : angular.module("popup", []),
        advert : angular.module("advert", []),
        advertiser : angular.module("advertiser", []),
        app : angular.module("app", [ "services", "notifier", "auth", "popup", "advert", "advertiser" ])
    };
}