"use strict";

function getModules () {
    return {
        services : angular.module("services", []),
        providers : angular.module("providers", []),
        filters : angular.module("filters", []),
        notifier : angular.module("notifier", []),
        lightbox : angular.module("lightbox", []),
        auth : angular.module("auth", []),
        popup : angular.module("popup", []),
        pet : angular.module("pet", []),
        author : angular.module("author", []),
        config : angular.module("config", []),
        translation : angular.module("translation", []),
        images : angular.module("images", []),
        form : angular.module("form", []),
        header : angular.module("header", []),
        parallax : angular.module("parallax", []),
        app : angular.module("app",
            [
                "providers",
                "lightbox",
                "config",
                "angularFileUpload",
                "services",
                "filters",
                "notifier",
                "auth",
                "popup",
                "pet",
                "author",
                "translation",
                "images",
                "form",
                "header",
                "parallax"
            ]
        )
    };
}