"use strict";
function authControllersInit ( module ) {
    module.controller('authCtrl', [
        "$scope", "$timeout", "authService", "notify",
        function ( $scope, $timeout, authService, notify ) {

            this.authenticate = ( name ) => {

                authService.authenticate(name, { email : this.email, password : this.password })
                           .then(( response ) => {
                               if ( response.data.success ) {

                                   if ( response.data.user && response.data.user.name ) {
                                       notify.inform({
                                           message : `[[Welcome back]], ${response.data.user.name}`,
                                           duration : 1000,
                                           delay : 900
                                       });
                                   } else {
                                       if ( name == "registration" ) {
                                           notify.inform({
                                               message : "[[Welcome]].",
                                               duration : 1000,
                                               delay : 900
                                           });
                                       } else if ( name == "login" ) {
                                           notify.inform({
                                               message : "[[Welcome back]].",
                                               duration : 1000,
                                               delay : 900
                                           });
                                       }
                                   }

                                   $timeout(2000)
                                       .then(() => {
                                           $scope.$broadcast("formResponse", {
                                               responseClass : "success"
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
                                               responseClass : "fail"
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

    module.controller('resetPassCtrl', [
        "$scope", "author", "$timeout", "notify",
        function ( $scope, author, $timeout, notify ) {
            let hash;
            this.send = () => {
                hash = btoa(this.email);

                author.reset({ hash })
                      .then(( response ) => {
                          if ( response.data.success ) {
                              notify.inform({
                                  message : "[[Email sent]].",
                                  duration : 1000
                              });
                              $scope.$broadcast("formResponse", {
                                  responseClass : "",
                                  reset : true
                              });
                          }
                          else {
                              notify.error({
                                  message : `[[${response.data.message}]].`,
                                  duration : 1000,
                                  delay : 500
                              });
                              $timeout(500)
                                  .then(() => {
                                      $scope.$broadcast("formResponse", {
                                          responseClass : "fail",
                                          reset : true
                                      });
                                  });
                          }
                      })
                      .catch(( err ) => {
                          console.log(err);
                          notify.error({
                              message : "[[Email wasn't send]].",
                              duration : 1000,
                              delay : 500
                          });
                          $timeout(500)
                              .then(() => {
                                  $scope.$broadcast("formResponse", {
                                      responseClass : "fail",
                                      reset : true
                                  });
                              });
                      });
            };
        }
    ]);

    module.controller('verificationBannerCtrl', [
        "$scope", "author", "$timeout", "notify",
        function ( $scope, author, $timeout, notify ) {
            let hash;
            this.send = () => {
                hash = btoa(this.email);

                author.verify({ hash })
                      .then(( response ) => {
                          if ( response.data.success ) {
                              notify.inform({
                                  message : "[[Email sent]].",
                                  duration : 1000
                              });
                          }
                          else {
                              notify.error({
                                  message : `[[${response.data.message}]].`,
                                  duration : 1000,
                                  delay : 500
                              });
                          }
                      })
                      .catch(( err ) => {
                          console.log(err);
                          notify.error({
                              message : "[[Email wasn't send]].",
                              duration : 1000,
                              delay : 500
                          });
                      });
            };
        }
    ]);
}