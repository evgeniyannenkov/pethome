"use strict";
function authControllersInit ( module ) {

    module.controller('authCtrl', [
        "$scope", "$timeout", "authService", "validate",
        function ( $scope, $timeout, authService, validate ) {

            this.emailRegex = validate.email();
            this.passwordRegex = validate.password();

            this.checkForm = ( form ) => {
                this.error = !$scope[form].$valid;
                this.validClass = $scope[form].$valid ? "valid" : "error";
            };

            this.submit = ( form ) => {
                $scope[form].email.$setTouched();
                $scope[form].password.$setTouched();

                if ( $scope[form].$valid ) {

                    authService.authenticate(form, {email : this.email, password : this.password})
                               .then(( response ) => {
                                   if ( response.data.success ) {
                                       $timeout(() => {
                                           this.responseClass = "success";
                                           document.location.reload();
                                       }, 2000);
                                   } else {
                                       console.log(`${$scope[form]}: failed`);
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
                    console.log(`${$scope[form]} form invalid`);
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