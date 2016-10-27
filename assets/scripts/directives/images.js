"use strict";

function imagesDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('imagesUpload', [
        function () {

            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/images-upload.html`,
                scope : {
                    advert_id : "@advertId",
                },
                controller : "imagesUploadCtrl",
                controllerAs : "uploader"
            };
        }
    ]);

}
