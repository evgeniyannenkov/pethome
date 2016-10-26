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

                                       if ( response.data.user && response.data.user.name ) {
                                           notify.success("Welcome back, " + response.data.user.name);
                                       } else {
                                           if ( form == "registration" ) {
                                               notify.success("Welcome.");
                                           } else if ( form == "login" ) {
                                               notify.success("Welcome back.", 1000, 900);
                                           }
                                       }

                                       $timeout(() => {
                                           this.responseClass = "success";
                                           document.location.href = "/profile";
                                       }, 2000);
                                   } else {
                                       console.log(`${$scope[ form ]}: failed`);
                                       console.log(response);
                                   }
                               })
                               .catch(( err ) => {
                                   if ( !err.data || !err.data.success ) {
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