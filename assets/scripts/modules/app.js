"use strict";

function getModules () {
    return {
        services : angular.module("services", []),
        filters : angular.module("filters", []),
        notifier : angular.module("notifier", []),
        auth : angular.module("auth", []),
        popup : angular.module("popup", []),
        advert : angular.module("advert", []),
        author : angular.module("author", []),
        config : angular.module("config", []),
        translation : angular.module("translation", []),
        images : angular.module("images", []),
        form : angular.module("form", []),
        app : angular.module("app",
            [
                "pascalprecht.translate",
                "angularFileUpload",
                "services",
                "filters",
                "notifier",
                "auth",
                "popup",
                "advert",
                "author",
                "config",
                "translation",
                "images",
                "form"
            ]
        )
    };
}