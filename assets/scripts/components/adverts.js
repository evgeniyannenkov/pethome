"use strict";

function advertComponentsInit ( module, constants ) {

    module.component('feed', {
        templateUrl : `${constants.templatesFolder}/adverts-feed.html`,
        bindings : {
            id : "@authorId",
            filter_enabled : "=enableFilter",
            hideFields : "=",
            allAllowed : "=",
            customFilter : "="
        },
        controller : "advertsFeedCtrl",
        controllerAs : "feed"
    });

    module.component('filter', {
        templateUrl : `${constants.templatesFolder}/adverts-filter.html`,
        bindings : {
            fields : "=feedFilter"
        },
        controller : "advertsFeedFilterCtrl",
        controllerAs : "filter"
    });

    module.component('advert', {
        templateUrl : `${constants.templatesFolder}/advert.html`,
        bindings : {
            fields : "=",
            author : "=",
            hide : "=hideFields"
        },
        controllerAs : "advert"
    });

    module.component('advertSingle', {
        require : {
            currentUser : "^^currentUser"
        },
        templateUrl : `${constants.templatesFolder}/advert-single.html`,
        bindings : {
            id : "@advertId",
            reviewEnabled : "=enableReview",
            editEnabled : "=enableEdit",
        },
        controller : "advertCtrl",
        controllerAs : "advert"
    });

    module.component('advertEdit', {
        require : {
            popup : "^^?popupContent",
            advert : '^^advertSingle'
        },
        templateUrl : `${constants.templatesFolder}/advert-edit.html`,
        bindings : {
            fields : "=advert"
        },
        controller : "editAdvertCtrl",
        controllerAs : "editor"
    });

    module.component('advertRemove', {
        require : {
            popup : "^^?popup",
            form : "^^?form"
        },
        templateUrl : `${constants.templatesFolder}/advert-remove.html`,
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
        templateUrl : `${constants.templatesFolder}/advert-create.html`,
        controller : "newAdvertCtrl",
        controllerAs : "new"
    });
}
