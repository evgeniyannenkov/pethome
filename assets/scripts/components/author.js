"use strict";

function authorComponentsInit ( module, constants ) {

    module.component('author', {
        templateUrl : `${constants.templatesFolder}/author.html`,
        bindings : {
            id : "@authorId",
            edit : "=",
            remove : "="
        },
        controller : "authorCtrl",
        controllerAs : "author"
    });

    module.component('authorsList', {
        templateUrl : `${constants.templatesFolder}/authors.html`,
        controller : "authorsListCtrl",
        controllerAs : "list"
    });

    module.component('authorEdit', {
        templateUrl : `${constants.templatesFolder}/author-edit.html`,
        require : {
            popup : "^^?popup",
            author: "^^?author"
        },
        controller : "authorEditCtrl",
        controllerAs : "editor"
    });

    module.component('authorRemove', {
        templateUrl : `${constants.templatesFolder}/author-remove.html`,
        require : {
            popup : "^^?popup",
            author: "^^?author"
        },
        controller : "authorRemoveCtrl",
        controllerAs : "remover"
    });

    module.component('authorBlock', {
        templateUrl : `${constants.templatesFolder}/author-block.html`,
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
