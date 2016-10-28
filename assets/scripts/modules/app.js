"use strict";

function getModules () {
    return {
        services : angular.module("services", []),
        notifier : angular.module("notifier", []),
        auth : angular.module("auth", []),
        popup : angular.module("popup", []),
        advert : angular.module("advert", []),
        advertiser : angular.module("advertiser", []),
        config : angular.module("config", []),
        translation : angular.module("translation", []),
        images : angular.module("images", []),
        app : angular.module("app",
            [
                "pascalprecht.translate",
                "angularFileUpload",
                "services",
                "notifier",
                "auth",
                "popup",
                "advert",
                "advertiser",
                "config",
                "translation",
                "images"
            ]
        )
    };
}