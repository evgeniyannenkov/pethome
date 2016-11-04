"use strict";

function popupControllersInit ( module ) {

    module.controller('popupCtrl', [
        "$scope",
        function ($scope) {
            this.close = ( event ) => {
                if ( event ) {
                    if ( angular.element(event.target).hasClass("popup") ) {
                        this.active = false;
                    }
                } else {
                    this.active = false;
                }
            };
            this.open = () => {
                this.active = true;
                $scope.$broadcast("popup_open", this.type.toLowerCase());
            }
        }
    ]);
}