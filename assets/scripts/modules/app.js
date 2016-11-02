"use strict";

function getModules () {
    return {
        services : angular.module("services", []),
        notifier : angular.module("notifier", []),
        auth : angular.module("auth", []),
        popup : angular.module("popup", []),
        advert : angular.module("advert", []),
        author : angular.module("author", []),
        config : angular.module("config", []),
        translation : angular.module("translation", []),
        images : angular.module("images", []),
        form : angular.module("form", []),
        header : angular.module("header", []),
        app : angular.module("app",
            [
                "pascalprecht.translate",
                "angularFileUpload",
                "services",
                "notifier",
                "auth",
                "popup",
                "advert",
                "author",
                "config",
                "translation",
                "images",
                "form",
                "header"
            ]
        )
    };
}