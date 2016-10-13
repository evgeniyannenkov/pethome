"use strict";

function getModules () {
    return {
        auth: angular.module("auth", []),
        popup: angular.module("popup", []),
        app : angular.module("app", [ "auth", "popup" ])
    };
}