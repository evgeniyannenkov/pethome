"use strict";
function authControllersInit ( module ) {

    module.controller('authCtrl', [
        "$scope", "$http", "$timeout", "authService",
        function ( $scope, $http, $timeout, authService ) {

            this.emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
            this.passwordRegex = /.*\S.*/;

            this.checkForm = ( form ) => {
                this.error = !$scope[ form ].$valid;
                this.validClass = $scope[ form ].$valid ? "valid" : "error";
            };

            this.submit = ( form ) => {
                $scope[ form ].email.$setTouched();
                $scope[ form ].password.$setTouched();

                const url = form === "registration" ? "/api/advertiser" : "/api/advertiser/login";

                if ( $scope[ form ].$valid ) {

                    authService.authenticate(url, { email : this.email, password : this.password })
                               .then(( response ) => {
                                   if ( response.data.success ) {
                                       $timeout(() => {
                                           this.responseClass = "success";
                                           document.location.reload();
                                       }, 2000);
                                   } else {
                                       console.log(`${$scope[ form ]}: failed`);
                                       console.log(response);
                                   }
                               })
                               .catch(( err ) => {
                                   if ( !err.data.success ) {
                                       $timeout(() => {
                                           this.responseClass = "fail";
                                       }, 500);
                                       console.log(err.data.message);
                                   } else {
                                       console.log(err);
                                   }
                               });
                } else {
                    console.log(`${$scope[ form ]} form invalid`);
                }
            };

            this.reset = () => {
                this.error = false;
                this.validClass = '';
                this.responseClass = '';
            };

        }
    ]);

    module.controller('logoutCtrl', [
        "$http",
        function ( $http ) {

            this.logout = () => {
                $http({
                    method : "GET",
                    url : "/api/advertiser/logout"
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