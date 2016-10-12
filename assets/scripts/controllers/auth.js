"use strict";
function authControllersInit ( module ) {
    module.controller('authCtrl', [
        "$http",
        function ( $http ) {

        }
    ]);

    module.controller('logoutCtrl', [
        "$http",
        function ( $http ) {

            this.logout = () => {
                $http({
                    method : "GET",
                    url : "/advertiser/logout"
                }).then(( response ) => {
                    if ( response.data.success ) {
                        document.location.reload();
                    } else {
                        console.log(response.data.message);
                    }
                }).catch(( err ) => {
                    console.log(err);
                });
            };

        }
    ])
}