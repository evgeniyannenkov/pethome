"use strict";

function getModules () {
    return {
        services : angular.module("services", []),
        auth : angular.module("auth", []),
        popup : angular.module("popup", []),
        advert : angular.module("advert", []),
        advertiser : angular.module("advertiser", []),
        profile : angular.module("profile", []),
        app : angular.module("app", [ "services", "auth", "popup", "advert", "advertiser", "profile" ])
    };
}