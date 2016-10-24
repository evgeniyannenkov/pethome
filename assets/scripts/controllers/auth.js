"use strict";
function authControllersInit ( module ) {

    module.controller('authCtrl', [
        "$scope", "$timeout", "authService", "validate", "notify",
        function ( $scope, $timeout, authService, validate, notify ) {

            this.emailRegex = validate.email();
            this.passwordRegex = validate.password();

            this.checkForm = ( form ) => {
                this.error = !$scope[ form ].$valid;
                this.validClass = $scope[ form ].$valid ? "valid" : "error";
            };

            this.submit = ( form ) => {
                $scope[ form ].email.$setTouched();
                $scope[ form ].password.$setTouched();

                if ( $scope[ form ].$valid ) {

                    authService.authenticate(form, { email : this.email, password : this.password })
                               .then(( response ) => {
                                   if ( response.data.success ) {
                                       if ( response.data.user.name ) {
                                           notify.success("Hello, " + response.data.user.name);
                                       } else {
                                           notify.success("Logged in.");
                                       }

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
                                       notify.error(err.data.message);
                                       $timeout(() => {
                                           this.responseClass = "fail";
                                       }, 500);
                                   } else {
                                       console.log(err);
                                   }
                               });
                } else {
                    notify.error(`${form} form invalid`, 2000);
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
        "authService",
        function ( authService ) {

            this.logout = () => {

                authService.authenticate('logout')
                           .then(( response ) => {
                               if ( response.data.success ) {
                                   document.location.reload();
                               } else {
                                   console.log(response.data.message);
                               }
                           })
                           .catch(( err ) => {
                               console.log(err);
                           });

            };

        }
    ]);
}