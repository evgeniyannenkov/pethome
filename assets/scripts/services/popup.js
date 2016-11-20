"use strict";

function popupServicesInit ( module ) {

    module.factory('popup', [
        "$rootScope",
        function ( $rootScope ) {

            let eventName = "popup_open";

            const open = ( type, data ) => {
                $rootScope.$broadcast(eventName, type.toLowerCase(), data);
            };

            const onOpen = ( onOpenType ) => {
                return new Promise(( resolve ) => {
                    $rootScope.$on(eventName, function ( event, type, data ) {
                        if ( onOpenType == type ) {
                            resolve(data);
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