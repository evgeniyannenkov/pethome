"use strict";

function authorComponentsInit ( module, common ) {

    module.component('author', {
        templateUrl : common.getTemplatePath("author"),
        bindings : {
            id : "@authorId",
            edit : "=",
            remove : "="
        },
        controller : "authorCtrl",
        controllerAs : "author"
    });

    module.component('authorsList', {
        templateUrl : common.getTemplatePath("authors"),
        controller : "authorsListCtrl",
        controllerAs : "list"
    });

    module.component('authorEdit', {
        templateUrl : common.getTemplatePath("author-edit"),
        require : {
            popup : "^^?popup",
            author : "^^?author"
        },
        controller : "authorEditCtrl",
        controllerAs : "editor"
    });

    module.component('authorRemove', {
        templateUrl : common.getTemplatePath("author-remove"),
        require : {
            popup : "^^?popup",
            author : "^^?author"
        },
        controller : "authorRemoveCtrl",
        controllerAs : "remover"
    });

    module.component('authorBlock', {
        templateUrl : common.getTemplatePath("author-block"),
        require : {
            popup : "^^?popup"
        },
        bindings : {
            authorId : "@",
            action : "@"
        },
        controller : "authorBlockCtrl",
        controllerAs : "blocker"
    });
}
