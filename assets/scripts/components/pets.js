"use strict";

function petComponentsInit ( module, common ) {

    module.directive('feed', [
        function () {
            return {
                templateUrl : common.getTemplatePath("pets-feed"),
                scope : {
                    id : "@authorId",
                    hideFields : "=",
                    allAllowed : "=",
                    customFilter : "="
                },
                controller : "petsFeedCtrl",
                controllerAs : "feed",
                bindToController : true
            };
        }
    ]);

    module.component("pagination", {
        require : {
            feed : "^^?feed"
        },
        templateUrl : common.getTemplatePath("pagination"),

        controllerAs : "pagination"
    });

    module.component('search', {
        templateUrl : common.getTemplatePath("pets-search"),
        controller : "petsSearchCtrl",
        controllerAs : "search"
    });

    module.component('pet', {
        templateUrl : common.getTemplatePath("pet"),
        bindings : {
            fields : "=",
            author : "=",
            hide : "=hideFields"
        },
        controllerAs : "pet"
    });

    module.component('petSingle', {
        require : {
            currentUser : "^^currentUser"
        },
        templateUrl : common.getTemplatePath("pet-single"),
        bindings : {
            id : "@petId",
            reviewEnabled : "=enableReview",
            editEnabled : "=enableEdit",
        },
        controller : "petCtrl",
        controllerAs : "pet"
    });

    module.component('petEdit', {
        require : {
            popup : "^^?popupContent",
            pet : '^^petSingle'
        },
        templateUrl : common.getTemplatePath("pet-edit"),
        bindings : {
            fields : "=pet"
        },
        controller : "editPetCtrl",
        controllerAs : "editor"
    });

    module.component('petRemove', {
        require : {
            popup : "^^?popup",
            form : "^^?form"
        },
        templateUrl : common.getTemplatePath("pet-remove"),
        bindings : {
            id : "@petId"
        },
        controller : "petRemoveCtrl",
        controllerAs : "remover"
    });

    module.component('petCreate', {
        require : {
            popup : "^^?popup"
        },
        templateUrl : common.getTemplatePath("pet-create"),
        controller : "newPetCtrl",
        controllerAs : "new"
    });
}
