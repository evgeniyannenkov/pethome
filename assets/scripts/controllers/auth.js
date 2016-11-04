"use strict";
function authControllersInit ( module ) {
    module.controller('authCtrl', [
        "$scope", "$timeout", "authService", "notify",
        function ( $scope, $timeout, authService, notify ) {

            this.authenticate = ( fields, name ) => {

                authService.authenticate(name, {email : fields.email, password : fields.password})
                           .then(( response ) => {
                               if ( response.data.success ) {

                                   if ( response.data.user && response.data.user.name ) {
                                       notify.inform({
                                           message : `Welcome back, ${response.data.user.name}`,
                                           duration : 1000,
                                           delay : 900
                                       });
                                   } else {
                                       if ( name == "registration" ) {
                                           notify.inform({
                                               message : "Welcome",
                                               duration : 1000,
                                               delay : 900
                                           });
                                       } else if ( name == "login" ) {
                                           notify.inform({
                                               message : "Welcome back.",
                                               duration : 1000,
                                               delay : 900
                                           });
                                       }
                                   }

                                   $timeout(2000)
                                       .then(() => {
                                           $scope.$broadcast("formResponse", {
                                               responseClass: "success"
                                           });
                                           document.location.href = "/profile";
                                       });
                               } else {
                                   console.log(`${name}: failed`);
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
                                           $scope.$broadcast("formResponse", {
                                               responseClass: "fail"
                                           });
                                       });

                               } else {
                                   console.log(err);
                               }
                           });
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