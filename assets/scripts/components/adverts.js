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
        // templateUrl : `${constants.templatesFolder}/advert.html`,
        template : `<div class="advert__head">
                      <div ng-if="advert.fields.title &amp;&amp; !advert.hide.title" class="advert__field advert__field--title"><a href="/advert/{{advert.fields._id}}">{{advert.fields.title}}</a></div>
                      <div background-image="{{advert.fields.mainImage}}" type="{{advert.fields.type}}" class="advert__field advert__field--image"><a href="/advert/{{advert.fields._id}}"></a></div>
                      <div class="advert__field advert__field--time">{{advert.fields.publicationDate | translate : 'time'}}</div>
                      <div class="advert__field advert__field--date">{{advert.fields.publicationDate | translate : 'date'}}</div>
                    </div>
                    <div class="advert__content">
                      <div ng-if="!advert.hide.name" class="advert__field">
                        <div class="advert__field-name">{{'name' | translate}}</div>
                        <div class="advert__field-content">{{advert.fields.name}}</div>
                      </div>
                      <div ng-if="!advert.hide.type" class="advert__field">
                        <div class="advert__field-name">{{'type' | translate}}</div>
                        <div class="advert__field-content">{{advert.fields.type | translate}}</div>
                      </div>
                      <div ng-if="!advert.hide.gender" class="advert__field">
                        <div class="advert__field-name">{{'gender' | translate}}</div>
                        <div class="advert__field-content">{{advert.fields.gender | translate}}</div>
                      </div>
                      <div ng-if="!advert.hide.age" class="advert__field">
                        <div class="advert__field-name">{{'age' | translate}}</div>
                        <div class="advert__field-content">{{advert.fields.age || 'Not specified' | translate}}</div>
                      </div>
                      <div ng-if="!advert.hide.breed" class="advert__field">
                        <div class="advert__field-name">{{'breed' | translate}}</div>
                        <div class="advert__field-content">{{advert.fields.breed || 'Not specified' | translate}}</div>
                      </div>
                      <div ng-if="!advert.hide.author" class="advert__field advert__field--author"><span class="advert__field-name">{{'Author' | translate}}</span><a href="/author/{{advert.author._id}}" class="advert__field-content"> {{advert.author.name || 'Go to' | translate}}</a></div>
                      <div ng-if="!advert.hide.info" class="advert__field advert__field--info">
                        <div class="advert__field-name advert__field-name--small">{{'info' | translate}}</div>
                        <div class="advert__field-content">{{advert.fields.info || 'Not specified' | translate | excerpt : 10}}</div>
                        <a type="button" href="/advert/{{advert.fields._id}}" class="button button--read_more button--blue button--invert_hover"><span class="button__title">{{'Read more' | translate}}</span></a>
                      </div>
                    </div>`,
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
