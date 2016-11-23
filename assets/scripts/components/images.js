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
                    bg = 'assets/images/bg/pet-bg-' + atts.type + '.svg';
                    bgSize = "20%";
                } else {
                    bg = 'assets/images/bg/pet-bg-other.svg';
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
                template : `<div class="background-block {{classes}}" ng-parallax ratio="0.1" style="background-image: url('{{url}}');" ng-transclude></div>`,
                scope : {
                    url : "@backgroundBlock",
                    classes : "@"
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
            pet_id : "@petId",
            pet : "="
        },
        controller : "imagesUploadCtrl",
        controllerAs : "images"
    });

    module.component('ngImage', {
        template : `<div class="image" lightbox-trigger="{{image.src}}" style="background-image: url('{{image.src}}')">
                        <div ng-if="image.showActions && !image.isMain" class="image__button image__button--top" ng-click="image.topBtn({image : image.src});">{{"Set as main image" | translate}}</div>
                        <div ng-if="image.showActions && image.isMain" class="image__button image__button--top icon-check"></div>
                        <div ng-if="image.showActions" class="image__button image__button--bottom" ng-click="image.bottomBtn({image : image.src});">{{"remove" | translate}}</div>
                    </div>`,
        bindings : {
            src : "@image",
            topBtn : "&",
            bottomBtn : "&",
            isMain : "=",
            showActions : "="
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
}
