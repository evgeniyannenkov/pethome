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

    module.component('authorEdit', {
        templateUrl : `${constants.templatesFolder}/author-edit.html`,
        require : {
            popup : "^^?popup"
        },
        bindings : {
            author : "="
        },
        controller : "authorEditCtrl",
        controllerAs : "editor"
    });

    module.component('authorRemove', {
        templateUrl : `${constants.templatesFolder}/author-remove.html`,
        require : {
            popup : "^^?popup"
        },
        bindings : {
            author : "="
        },
        controller : "authorRemoveCtrl",
        controllerAs : "remover"
    });
}
