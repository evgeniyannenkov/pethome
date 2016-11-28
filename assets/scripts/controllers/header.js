"use strict";

function headerControllersInit ( module ) {

    module.controller("headerCtrl", [
        "$rootScope", "$window",
        function ( $rootScope, $window ) {
            this.mobile = false;
            this.languageSelect = false;

            const onResize = () => {
                $rootScope.$broadcast('resize');
            };

            const cleanUp = () => {
                angular.element($window).off('resize', onResize);
            };

            angular.element($window).on('resize', onResize);
            $rootScope.$on('$destroy', cleanUp);

        }
    ]);

    module.controller("headerBtnCtrl", [
        "$rootScope",
        function ( $rootScope ) {
            this.open = () => {
                this.header.mobile = !this.header.mobile;
            };

            $rootScope.$on("popup_open", ( event, data ) => {
                if ( data && this.header.mobile ) {
                    this.hide = true;
                }
            });

            $rootScope.$on("popup_close", ( event, data ) => {
                if ( data && this.header.mobile ) {
                    this.hide = false;
                }
            });
        }
    ]);
}