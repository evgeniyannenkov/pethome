"use strict";

function popupControllersInit ( module ) {

    module.controller('popupCtrl', [
        function () {
            this.close = ( event ) => {
                if ( event ) {
                    if ( angular.element(event.target).hasClass("popup") ) {
                        this.active = false;
                    }
                } else {
                    this.active = false;
                }
            }
        }
    ]);
}