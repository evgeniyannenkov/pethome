"use strict";

function getModules () {
    return {
        auth: angular.module("auth", []),
        app : angular.module("app", [ "auth" ])
    };
}