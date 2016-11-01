"use strict";

function imagesComponentsInit (  module, constants  ) {

    module.component('imagesUploader', {
        templateUrl : `${constants.templatesFolder}/images-upload.html`,
        bindings : {
            advert_id : "@advertId",
            advert : "="
        },
        controller : "imagesUploadCtrl",
        controllerAs : "images"
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
                        canvas.attr({width : width, height : height});
                        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                    }
                }
            };
        }
    ]);

}
