"use strict";

function imageUploadControllersInit ( module ) {

    module.controller('imagesUploadCtrl', [
        "FileUploader", "notify", "$rootScope",
        function ( FileUploader, notify, $rootScope ) {

            this.fileUploader = new FileUploader({
                alias : "images",
                queueLimit : 10
            });

            // FILTERS

            this.fileUploader.filters.push({
                name : 'imageFilter',
                fn : function ( item /*{File|FileLikeObject}*/, options ) {
                    const type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

            $rootScope.$on("popup_open", ( event, data, type ) => {

                if ( type == "upload images" ) {
                    this.fileUploader.url = `/api/pet/${this.pet_id}/images`;
                }
            });

            this.fileUploader.onSuccessItem = ( fileItem, response, status, headers ) => {
                fileItem.remove();
                this.pet.images = response.newPet.images;
                this.pet.mainImage = response.newPet.mainImage;
            };

            this.fileUploader.onProgressAll = ( response ) => {
                console.log(response);
            };

            this.fileUploader.onCompleteAll = ( response ) => {
                if ( !this.fileUploader.queue.length ) {
                    this.popup.close();
                }
                notify.inform({
                    message : `[[Images added]].`,
                    duration : 1500
                });
            };
        }
    ]);
}