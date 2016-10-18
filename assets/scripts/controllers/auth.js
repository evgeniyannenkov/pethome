"use strict";
function authControllersInit ( module ) {

    module.controller('registrationCtrl', [
        "$http", "authService",
        function ( $http, authService ) {

            this.registration = () => {
                authService.authenticate("/advertiser", {email : this.email, password : this.password}, "registration");
            };
        }
    ]);

    module.controller('loginCtrl', [
        "$http", "authService",
        function ( $http, authService ) {

            this.login = () => {
                authService.authenticate("/advertiser/login", {email : this.email, password : this.password}, "login");
            };
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