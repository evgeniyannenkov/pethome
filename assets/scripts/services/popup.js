"use strict";

function popupServicesInit ( module ) {

    module.factory('popup', [
        "$rootScope",
        function ( $rootScope ) {

            let eventName = "popup_open";

            const open = ( type, data ) => {
                $rootScope.$broadcast(eventName, data, type.toLowerCase());
            };

            return {
                open
            };

        }
    ]);
}