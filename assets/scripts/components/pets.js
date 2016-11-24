"use strict";

function petComponentsInit ( module, constants ) {

    module.directive('feed', [
        "$window",
        function ( $window ) {
            return {
                templateUrl : `${constants.templatesFolder}/pets-feed.html`,
                scope : {
                    id : "@authorId",
                    filter_enabled : "=enableFilter",
                    hideFields : "=",
                    allAllowed : "=",
                    customFilter : "="
                },
                controller : "petsFeedCtrl",
                controllerAs : "feed",
                bindToController : true
            };
        } ]);

    module.component("feedPagination", {
        require : {
            feed : "^^?feed"
        },
        template : `<button ng-click="pagination.feed.prevPage();" ng-if="pagination.feed.prev">Previous Page</button>
                    <span>{{pagination.feed.page}}</span>
                    <button ng-click="pagination.feed.nextPage();" ng-if="pagination.feed.next">Next Page</button>
                    <span ng-show="pagination.feed.inProgress">In Progress</span>
                    `,
        controllerAs : "pagination"
    });

    module.component('filter', {
        require : {
            feed : "^^?feed"
        },
        templateUrl : `${constants.templatesFolder}/pets-filter.html`,
        bindings : {
            fields : "=feedFilter"
        },
        controller : "petsFeedFilterCtrl",
        controllerAs : "filter"
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
