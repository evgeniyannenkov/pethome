"use strict";

function lightboxServicesInit ( module ) {

    module.service('lightboxService', [

        function () {

            this.lightbox = {
                images : [],
                active : false,
                currentIndex : 0,
                currentImage : ""
            };

            this.addImage = ( image ) => {
                this.lightbox.images.push(image);
            };

            this.open = ( image ) => {
                this.lightbox.currentImage = image;
                this.lightbox.currentIndex = this.lightbox.images.indexOf(image);
                this.lightbox.active = true;
            };

            this.close = () => {
                this.lightbox.active = false;
            };

            this.next = () => {
                this.lightbox.currentIndex = this.lightbox.currentIndex === this.lightbox.images.length - 1
                    ? 0
                    : this.lightbox.currentIndex + 1;
                this.lightbox.currentImage = this.lightbox.images[ this.lightbox.currentIndex ];
            };
            this.previous = () => {
                this.lightbox.currentIndex = this.lightbox.currentIndex === 0
                    ? this.lightbox.images.length - 1
                    : this.lightbox.currentIndex - 1;
                this.lightbox.currentImage = this.lightbox.images[ this.lightbox.currentIndex ];
            };

        }
    ]);
}