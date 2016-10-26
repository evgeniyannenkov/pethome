"use strict";

function imageUploadControllersInit ( module ) {

    module.controller('imagesUploadCtrl', [
        "$scope", "FileUploader",
        function ( $scope, FileUploader ) {
            $scope.fileUploader = new FileUploader({
                url : `/api/advert/580f4a2331a7fd18240a187d/images`,
                alias : "images"
            });
        }
    ]);
}