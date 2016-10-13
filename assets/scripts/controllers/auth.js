"use strict";
function authControllersInit ( module ) {

    module.controller('registrationCtrl', [
        "$http",
        function ( $http ) {

            this.registration = () => {
                $http({
                    method : "post",
                    url : "/advertiser",
                    data : {
                        email : this.email,
                        password : this.password,
                    }
                }).then(( response ) => {
                    if(response.data.success) {
                        document.location.reload();
                    } else {
                        console.log("Registration: failed");
                        console.log(response);
                    }
                }).catch(( err ) => {
                    if(err.data.success === false) {
                        console.log(err.data.message);
                    } else {
                        console.log(err);
                    }
                });
            };
        }
    ]);

    module.controller('loginCtrl', [
        "$http",
        function ( $http ) {

            this.login = () => {
                $http({
                    method : "post",
                    url : "/advertiser/login",
                    data : {
                        email : this.email,
                        password : this.password,
                    }
                }).then(( response ) => {
                    if(response.data.success) {
                        document.location.reload();
                    } else {
                        console.log("Login: failed");
                        console.log(response);
                    }
                }).catch(( err ) => {
                    if(err.data.success === false) {
                        console.log(err.data.message);
                    } else {
                        console.log(err);
                    }
                });

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