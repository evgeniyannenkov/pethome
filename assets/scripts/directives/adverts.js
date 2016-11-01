"use strict";

function advertDirectivesInit ( module ) {
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
            author : "=advertAuthor",
            hide : "=hideFields"
        },
        controllerAs: "advert"
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
        templateUrl : `${templatesFolder}/advert-edit.html`,
        bindings : {
            fields : "=advert",
            popupClose : "&popupClose",
            advertUpdate : "&advertUpdate"
        },
        controller : "editAdvertCtrl",
        controllerAs : "editor"
    });

    module.component('advertRemove', {
        templateUrl : `${templatesFolder}/advert-remove.html`,
        bindings : {
            id : "@advertId",
            cancel : "&popupClose"
        },
        controller : "advertRemoveCtrl",
        controllerAs : "remover"
    });

    module.component('advertCreate', {
        templateUrl : `${templatesFolder}/advert-create.html`,
        bindings : {
            cancel : "&popupClose"
        },
        controller : "newAdvertCtrl",
        controllerAs : "new"
    });
}
