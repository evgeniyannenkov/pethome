"use strict";

function popupControllersInit ( module ) {

    module.controller('popupContentCtrl', [
        "$rootScope", "$scope",
        function ( $rootScope, $scope ) {

            this.isExpected = ( type ) => {
                return this.expected && this.expected.indexOf(type) != -1;
            };

            $rootScope.$on("popup_open", ( event, data, type ) => {
                if ( this.isExpected(type) ) {
                    this.open(type, data);
                    $scope.$apply();
                }
            });

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
            this.open = ( type, data ) => {
                this.type = type;
                this.data = data;
                this.active = true;
            };
        }
    ]);
}