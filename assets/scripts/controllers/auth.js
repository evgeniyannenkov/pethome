"use strict";
function authControllersInit ( module ) {

    const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    const passwordRegex = /.*\S.*/;

    module.controller('registrationCtrl', [
        "$scope", "$http", "$timeout", "authService",
        function ( $scope, $http, $timeout, authService ) {

            this.emailRegex = emailRegex;
            this.passwordRegex = passwordRegex;
            this.type = "registration";

            this.checkForm = () => {
                this.error = !$scope.registrationForm.$valid;
                this.validClass = $scope.registrationForm.$valid ? "valid" : "error";
            };

            this.registration = () => {
                $scope.registrationForm.email.$setTouched();
                $scope.registrationForm.password.$setTouched();

                if ( $scope.registrationForm.$valid ) {

                    authService.authenticate("/advertiser", {email : this.email, password : this.password})
                               .then(( response ) => {
                                   if ( response.data.success ) {
                                       $timeout(() => {
                                           this.responseClass = "success";
                                           document.location.reload();
                                       }, 3000);
                                   } else {
                                       console.log(`${this.type}: failed`);
                                       console.log(response);
                                   }
                               })
                               .catch(( err ) => {
                                   if ( !err.data.success ) {
                                       $timeout(() => {
                                           this.responseClass = "fail";
                                       }, 3000);
                                       console.log(err.data.message);
                                   } else {
                                       console.log(err);
                                   }
                               });
                } else {
                    console.log("Registration Form Invalid");
                }
            };

        }
    ]);

    module.controller('loginCtrl', [
        "$scope", "$http", "$timeout", "authService",
        function ( $scope, $http, $timeout, authService ) {

            this.emailRegex = emailRegex;
            this.passwordRegex = passwordRegex;
            this.type = "login";

            this.checkForm = () => {
                this.error = !$scope.loginForm.$valid;
                this.validClass = $scope.loginForm.$valid ? "valid" : "error";
            };

            this.login = () => {
                $scope.loginForm.email.$setTouched();
                $scope.loginForm.password.$setTouched();

                if ( $scope.loginForm.$valid ) {
                    authService.authenticate("/advertiser/login", {email : this.email, password : this.password})
                               .then(( response ) => {
                                   if ( response.data.success ) {
                                       $timeout(() => {
                                           this.responseClass = "success";
                                           document.location.reload();
                                       }, 3000);
                                   } else {
                                       console.log(`${this.type}: failed`);
                                       console.log(response);
                                   }
                               })
                               .catch(( err ) => {
                                   if ( !err.data.success ) {
                                       $timeout(() => {
                                           this.responseClass = "fail";
                                       }, 3000);
                                       console.log(err.data.message);
                                   } else {
                                       console.log(err);
                                   }
                               });
                } else {
                    console.log("Login Form Invalid");
                }
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