"use strict";

function popupControllersInit ( module ) {

    module.controller('popupCtrl', [
        "$rootScope",
        function ($rootScope) {
            this.close = ( event ) => {
                if ( event ) {
                    if ( angular.element(event.target).hasClass("popup") ) {
                        this.active = false;
                    }
                } else {
                    this.active = false;
                }
                $rootScope.$broadcast("popup_close", this.type.toLowerCase());
            };
            this.open = () => {
                this.active = true;
                $rootScope.$broadcast("popup_open", this.type.toLowerCase());
            }
        }
    ]);
}