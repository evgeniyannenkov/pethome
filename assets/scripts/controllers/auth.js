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
                                           notify.success({
                                               message : `Welcome back, ${response.data.user.name}`,
                                               duration : 1000,
                                               delay : 900
                                           });
                                       } else {
                                           if ( form == "registration" ) {
                                               notify.success({
                                                   message : "Welcome",
                                                   duration : 1000,
                                                   delay : 900
                                               });
                                           } else if ( form == "login" ) {
                                               notify.success({
                                                   message : "Welcome back.",
                                                   duration : 1000,
                                                   delay : 900
                                               });
                                           }
                                       }

                                       $timeout(2000)
                                           .then(() => {
                                               this.responseClass = "success";
                                               document.location.href = "/profile";
                                           });
                                   } else {
                                       console.log(`${$scope[ form ]}: failed`);
                                       console.log(response);
                                   }
                               })
                               .catch(( err ) => {
                                   if ( !err.data || !err.data.success ) {
                                       notify.error({
                                           message : err.data.message,
                                           duration : 2000
                                       });

                                       $timeout(500)
                                           .then(() => {
                                               this.responseClass = "fail";
                                           });

                                   } else {
                                       console.log(err);
                                   }
                               });
                } else {
                    notify.error({
                        message : `${form} form invalid`,
                        duration : 2000
                    });
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