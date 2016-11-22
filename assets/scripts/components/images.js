"use strict";

function imagesComponentsInit ( module, constants ) {

    module.directive("backgroundImage", [
        function () {
            return ( scope, element, atts ) => {
                let bg,
                    bgSize;
                if ( atts.backgroundImage && atts.backgroundImage !== "background-image" ) {
                    bg = atts.backgroundImage;
                    bgSize = "cover";
                } else if ( atts.type ) {
                    bg = 'assets/images/bg/advert-bg-' + atts.type + '.svg';
                    bgSize = "20%";
                } else {
                    bg = 'assets/images/bg/advert-bg-other.svg';
                    bgSize = "20%";
                }

                element.css({
                    'background-image' : `url('/${bg}')`,
                    'background-size' : bgSize,
                    'background-position' : 'center',
                    "background-repeat" : "no-repeat",
                    "background-color" : "#c6c5c5"
                });
            };
        }
    ]);

    module.directive("backgroundBlock", [
        function () {
            return {
                template : `<div class="background-block {{classes}}" ng-paralax ratio="0.1" style="background-image: url('{{url}}');" ng-transclude></div>`,
                scope : {
                    url : "@backgroundBlock",
                    classes : "@",
                },
                transclude : true,
            };
        }
    ]);

    module.component('imagesUploader', {
        templateUrl : `${constants.templatesFolder}/images-upload.html`,
        require : {
            popup : "^^popupContent"
        },
        bindings : {
            advert_id : "@advertId",
            advert : "="
        },
        controller : "imagesUploadCtrl",
        controllerAs : "images"
    });

    module.component('ngImage', {
        template : `<div class="image" lightbox-trigger="{{image.src}}" style="background-image: url('{{image.src}}')">
                        <div ng-if="!image.isMain" class="image__button image__button--top" ng-click="image.topBtn({image : image.src});">{{"Set as main image" | translate}}</div>
                        <div ng-if="image.isMain" class="image__button image__button--top fa fa-check" aria-hidden="true"></div>
                        <div class="image__button image__button--bottom" ng-click="image.bottomBtn({image : image.src});">{{"remove" | translate}}</div>
                    </div>`,
        bindings : {
            src : "@image",
            topBtn : "&",
            bottomBtn : "&",
            isMain : "="
        },
        controller : function () {

        },
        controllerAs : "image"
    });

    module.directive('ngThumb', [
        '$window', function ( $window ) {
            const helper = {
                support : !!($window.FileReader),
                isFile : function ( item ) {
                    return angular.isObject(item) && item instanceof $window.File;
                },
                isImage : function ( file ) {
                    const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            };

            return {
                restrict : 'AE',
                scope : {
                    file : "=newFile",
                },
                link : function ( scope, element ) {
                    if ( !helper.support ) {
                        return;
                    }

                    if ( !helper.isFile(scope.file) ) {
                        return;
                    }
                    if ( !helper.isImage(scope.file) ) {
                        return;
                    }

                    const reader = new FileReader();

                    reader.readAsDataURL(scope.file);
                    reader.onload = onLoadFile;

                    function onLoadFile ( event ) {
                        const img = new Image();
                        img.src = event.target.result;

                        element.append(img);
                    }
                }
            };
        }
    ]);

    module.directive("lightboxTrigger", function () {
        return {
            template : `<div ng-transclude></div>
                        <div class="lightbox-trigger__inner" ng-click="lightbox.open();"><i class="fa fa-search-plus" aria-hidden="true"></i></div>`,
            transclude : true,
            controllerAs : "lightbox",
            controller : [
                "lightboxService", "$scope",
                function ( lightboxService, $scope ) {
                    this.addImage = ( image ) => {
                        lightboxService.addImage(image);
                        this.image = image;
                    };
                    this.open = ( image = this.image ) => {
                        lightboxService.open(image);
                    };
                }
            ],
            link : ( scope, element, atts, ctrl ) => {
                let image = atts.lightboxTrigger;
                element.addClass("lightbox-trigger");
                ctrl.addImage(image);
            }
        };
    });

    module.directive("lightbox", function () {
        return {
            restrict : "AE",
            templateUrl : `${constants.templatesFolder}/lightbox.html`,
            controllerAs : "ctrl",
            controller : [
                "lightboxService", "$scope",
                function ( lightboxService, $scope ) {
                    this.lightbox = lightboxService.lightbox;

                    this.close = ( event ) => {
                        if ( !event || angular.element(event.target).hasClass("lightbox__inner") ) {
                            lightboxService.close();
                        }
                    };

                    this.next = () => {
                        lightboxService.next();
                    };

                    this.previous = () => {
                        lightboxService.previous();
                    };
                }
            ]
        };
    });
}
