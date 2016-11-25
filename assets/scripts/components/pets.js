"use strict";

function petComponentsInit ( module, constants ) {

    module.directive('feed', [
        function () {
            return {
                templateUrl : `${constants.templatesFolder}/pets-feed.html`,
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
        templateUrl : `${constants.templatesFolder}/pagination.html`,

        controllerAs : "pagination"
    });

    module.component('search', {
        templateUrl : `${constants.templatesFolder}/pets-search.html`,
        controller : "petsSearchCtrl",
        controllerAs : "search"
    });

    module.component('pet', {
        templateUrl : `${constants.templatesFolder}/pet.html`,
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
        templateUrl : `${constants.templatesFolder}/pet-single.html`,
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
        templateUrl : `${constants.templatesFolder}/pet-edit.html`,
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
        templateUrl : `${constants.templatesFolder}/pet-remove.html`,
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
        templateUrl : `${constants.templatesFolder}/pet-create.html`,
        controller : "newPetCtrl",
        controllerAs : "new"
    });
}
