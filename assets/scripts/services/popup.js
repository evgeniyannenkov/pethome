"use strict";

function popupServicesInit ( module ) {

    module.service('popup', [
        "$rootScope",
        function ( $rootScope ) {

            this.open = ( type, data ) => {
                $rootScope.$broadcast("popup_open", type.toLowerCase(), data);
            };

        }
    ]);
}