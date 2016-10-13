"use strict";

function getModules () {
    return {
        auth : angular.module("auth", []),
        popup : angular.module("popup", []),
        advert : angular.module("advert", []),
        app : angular.module("app", [ "auth", "popup", "advert" ])
    };
}