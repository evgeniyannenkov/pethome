"use strict";

function popupServicesInit ( module ) {

    module.factory('popup', [
        "$rootScope",
        function ( $rootScope ) {

            let eventName = "popup_open";

            const open = ( type, data ) => {
                $rootScope.$broadcast(eventName, data, type.toLowerCase());
            };

            const onOpen = ( onOpenType ) => {
                return new Promise(( resolve ) => {
                    $rootScope.$on(eventName, function ( event, data, type ) {
                        if ( !onOpenType || onOpenType == type ) {
                            resolve(data, type);
                        }
                    });
                });
            };

            return {
                open,
                onOpen
            };

        }
    ]);
}