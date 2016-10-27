"use strict";

function imageUploadControllersInit ( module ) {

    module.controller('imagesUploadCtrl', [
        "$scope", "FileUploader",
        function ( $scope, FileUploader ) {
            $scope.fileUploader = new FileUploader({
                url : `/api/advert/${$scope.advert_id}/images`,
                alias : "images"
            });
        }
    ]);
}