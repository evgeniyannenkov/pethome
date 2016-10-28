"use strict";

function imageUploadControllersInit ( module ) {

    module.controller('imagesUploadCtrl', [
        "$scope", "FileUploader", "notify",
        function ( $scope, FileUploader, notify ) {

            $scope.fileUploader = new FileUploader({
                url : `/api/advert/${$scope.advert_id}/images`,
                alias : "images",
                queueLimit : 10
            });

            // FILTERS

            $scope.fileUploader.filters.push({
                name : 'imageFilter',
                fn : function ( item /*{File|FileLikeObject}*/, options ) {
                    const type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

            $scope.fileUploader.onSuccessItem = function ( fileItem, response, status, headers ) {
                fileItem.remove();
                $scope.advert.images = response.newAdvert.images;
                $scope.advert.mainImage = response.newAdvert.mainImage;
            };

            $scope.fileUploader.onProgressAll = function ( response ) {
                console.log(response);
            };

            $scope.fileUploader.onCompleteAll = function ( response ) {
                notify.inform({
                    message : `Images added.`,
                    duration : 1500
                });
            };
        }
    ]);
}