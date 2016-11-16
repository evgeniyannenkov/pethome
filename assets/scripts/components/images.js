"use strict";

function imagesComponentsInit ( module, constants ) {

    module.directive("backgroundImage", [
        function () {
            return ( scope, element, atts ) => {
                let bg,
                    bgSize;
                console.log(atts);
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
                template : `<div class="background-block {{classes}}"  style="background-image: url('{{url}}');" ng-transclude></div>`,
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
        bindings : {
            advert_id : "@advertId",
            advert : "="
        },
        controller : "imagesUploadCtrl",
        controllerAs : "images"
    });

    module.component('ngImage', {
        template : `<div image-overview="{{image.src}}" class="image" style="background-image: url('/{{image.src}}')">
                        <div ng-if="!image.isMain" class="image__button image__button--set" ng-click="image.setMain({image : image.src});">{{"Set as main image" | translate}}</div>
                        <div ng-if="image.isMain" class="image__button image__button--set fa fa-check" aria-hidden="true"></div>
                        <div class="image__button image__button--remove" ng-click="image.remove({image : image.src});">{{"remove" | translate}}</div>
                    </div>`,
        bindings : {
            src : "@image",
            remove : "&",
            setMain : "&",
            isMain : "="
        },
        controller : function () {

        },
        controllerAs : "image"
    });

    module.directive('ngThumb', [
        '$window', function ( $window ) {
            const helper = {
                support : !!($window.FileReader && $window.CanvasRenderingContext2D),
                isFile : function ( item ) {
                    return angular.isObject(item) && item instanceof $window.File;
                },
                isImage : function ( file ) {
                    const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            };

            return {
                restrict : 'A',
                template : '<canvas/>',
                link : function ( scope, element, attributes ) {
                    if ( !helper.support ) {
                        return;
                    }

                    const params = scope.$eval(attributes.ngThumb);

                    if ( !helper.isFile(params.file) ) {
                        return;
                    }
                    if ( !helper.isImage(params.file) ) {
                        return;
                    }

                    const canvas = element.find('canvas');
                    const reader = new FileReader();

                    reader.onload = onLoadFile;
                    reader.readAsDataURL(params.file);

                    function onLoadFile ( event ) {
                        const img = new Image();
                        img.onload = onLoadImage;
                        img.src = event.target.result;
                    }

                    function onLoadImage () {
                        const width = params.width || this.width / this.height * params.height;
                        const height = params.height || this.height / this.width * params.width;
                        canvas.attr({ width : width, height : height });
                        canvas[ 0 ].getContext('2d').drawImage(this, 0, 0, width, height);
                    }
                }
            };
        }
    ]);

}
