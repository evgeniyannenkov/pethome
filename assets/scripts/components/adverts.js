"use strict";

function advertComponentsInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.component('feed', {
        templateUrl : `${templatesFolder}/adverts-feed.html`,
        bindings : {
            id : "@userId",
            filter_enabled : "=enableFilter",
            hideFields : "="
        },
        controller : "advertsFeedCtrl",
        controllerAs : "feed"
    });

    module.component('filter', {
        templateUrl : `${templatesFolder}/adverts-filter.html`,
        bindings : {
            fields : "=feedFilter"
        },
        controller : "advertsFeedFilterCtrl",
        controllerAs : "filter"
    });

    module.component('advert', {
        templateUrl : `${templatesFolder}/advert.html`,
        bindings : {
            fields : "=",
            author : "=",
            hide : "=hideFields"
        },
        controllerAs : "advert"
    });

    module.component('advertSingle', {
        templateUrl : `${templatesFolder}/advert-single.html`,
        bindings : {
            id : "@advertId"
        },
        controller : "advertCtrl",
        controllerAs : "advert"
    });

    module.component('advertEdit', {
        require : {
            popup : "^^?popup"
        },
        templateUrl : `${templatesFolder}/advert-edit.html`,
        bindings : {
            fields : "=advert",
            advertUpdate : "&advertUpdate"
        },
        controller : "editAdvertCtrl",
        controllerAs : "editor"
    });

    module.component('advertRemove', {
        require : {
            popup : "^^?popup",
            form : "^^?form"
        },
        templateUrl : `${templatesFolder}/advert-remove.html`,
        bindings : {
            id : "@advertId"
        },
        controller : "advertRemoveCtrl",
        controllerAs : "remover"
    });

    module.component('advertCreate', {
        require : {
            popup : "^^?popup"
        },
        templateUrl : `${templatesFolder}/advert-create.html`,
        controller : "newAdvertCtrl",
        controllerAs : "new"
    });
}
