"use strict";

function lightboxControllersInit ( module ) {

    module.controller('lightboxTriggerCtrl', [
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
    ]);

    module.controller('lightboxCtrl', [
            "lightboxService", "$scope", "$window",
            function ( lightboxService, $scope, $window ) {
                this.lightbox = lightboxService.lightbox;
                let _window = angular.element($window);

                const keyDownHandler = ( event ) => {
                    let keys = {
                        39 : "next",
                        37 : "previous",
                        27 : "close"
                    };

                    if ( this.lightbox.active && keys[ event.keyCode ] ) {
                        this[ keys[ event.keyCode ] ]();
                        $scope.$apply();
                    }
                };

                _window.on("keydown", keyDownHandler);
                $scope.$on('$destroy', function () {
                    _window.off('keydown', keyDownHandler);
                });

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
    );
}
