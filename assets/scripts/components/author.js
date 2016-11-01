"use strict";

function authorComponentsInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.component('author', {
        templateUrl : `${templatesFolder}/author.html`,
        bindings : {
            id : "@authorId",
            edit : "=",
            remove : "="
        },
        controller : "authorCtrl",
        controllerAs : "author"
    });

    module.component('authorEdit', {
        templateUrl : `${templatesFolder}/author-edit.html`,
        require : {
            popup: "^^?popup"
        },
        bindings : {
            author : "="
        },
        controller : "authorEditCtrl",
        controllerAs : "editor"
    });

    module.component('authorRemove', {
        templateUrl : `${templatesFolder}/author-remove.html`,
        require : {
            popup: "^^?popup"
        },
        bindings : {
            author : "="
        },
        controller : "authorRemoveCtrl",
        controllerAs : "remover"
    });
}
