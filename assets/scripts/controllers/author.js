"use strict";

function authorControllersInit ( module ) {

    module.controller('authorCtrl', [
        "author",
        function ( author ) {
            author.get({id : this.id})
                  .then(( response ) => {
                      if ( response.data.success ) {
                          this.fields = response.data.author;
                      }
                  })
                  .catch(( response ) => {
                      console.log(response);
                  });
        }
    ]);

    module.controller('authorsListCtrl', [
        "author",
        function ( author ) {
            this.authors = [];
            author.getAll()
                  .then(( response ) => {
                      if ( response.data.success ) {
                          this.authors = Object.keys(response.data.authors).map(function ( key ) {
                              return response.data.authors[key];
                          });
                      }
                  })
                  .catch(( response ) => {
                      console.log(response);
                  });
        }
    ]);

    module.controller('authorEditCtrl', [
        "author", "notify", "$scope", "$rootScope", "$timeout",
        function ( $author, notify, $scope, $rootScope, $timeout ) {

            $rootScope.$on("popup_open", ( $event, data, type ) => {
                if ( type == "edit profile" ) {
                    this.temporaryData = angular.copy(this.author.fields);
                    this.temporaryData.language = localStorage["preferred_language"] || 'ru';
                    $scope.$apply();
                }
            });

            this.edit = () => {

                $author.update({id : this.author.fields._id, data : this.temporaryData})
                       .then(( response ) => {
                           console.log(response);
                           if ( response.data.success ) {
                               notify.inform({
                                   message : `[[Updated]]  <i class="icon-check"></i>`,
                                   duration : 1500
                               });
                               this.author.fields = angular.copy(this.temporaryData);
                               if ( this.popup ) {
                                   this.popup.close();
                               }
                               $scope.$broadcast("formResponse", {
                                   responseClass : "",
                                   reset : true
                               });
                           } else {
                               notify.error({
                                   message : `[[Email is taken]]  <i class="icon-cancel"></i>`,
                                   delay : 500,
                                   duration : 1000
                               });
                               $timeout(500)
                                   .then(() => {
                                       $scope.$broadcast("formResponse", {
                                           responseClass : "fail"
                                       });
                                   });
                           }
                       })
                       .catch(( error ) => {
                           console.log(error);
                           $timeout(500)
                               .then(() => {
                                   $scope.$broadcast("formResponse", {
                                       responseClass : "fail"
                                   });
                               });
                       });
            };
        }
    ]);

    module.controller('authorRemoveCtrl', [
        "author", "notify", "$scope", "$timeout",
        function ( $author, notify, $scope, $timeout ) {

            this.remove = () => {
                $author.remove({id : this.author.fields._id})
                       .then(( response ) => {
                           if ( response.data.success ) {
                               notify.inform({
                                   message : `[[Removed]]  <i class="icon-check"></i>`,
                                   duration : 1000
                               });
                               $timeout(1200)
                                   .then(() => {
                                       $scope.$broadcast("formResponse", {
                                           responseClass : "success"
                                       });
                                       document.location.href = "/";
                                   });
                           }
                       })
                       .catch(( err ) => {
                           console.log(err);
                           $timeout(500)
                               .then(() => {
                                   $scope.$broadcast("formResponse", {
                                       responseClass : "fail"
                                   });
                               });
                       });
            };

        }
    ]);

    module.controller('authorBlockCtrl', [
        "author", "notify", "$scope", "$timeout",
        function ( author, notify, $scope, $timeout ) {

            this.block = () => {
                author.block({id : this.authorId})
                      .then(( response ) => {
                          if ( response.data.success ) {
                              notify.inform({
                                  message : response.data.message,
                                  duration : 1400
                              });
                              $timeout(1600)
                                  .then(() => {
                                      $scope.$broadcast("formResponse", {
                                          responseClass : "success"
                                      });
                                      document.location.reload();
                                  });
                          } else {
                              console.log(response);
                              $timeout(500)
                                  .then(() => {
                                      $scope.$broadcast("formResponse", {
                                          responseClass : "fail"
                                      });
                                  });
                          }
                      })
                      .catch(( err ) => {
                          console.log(err);
                          $timeout(500)
                              .then(() => {
                                  $scope.$broadcast("formResponse", {
                                      responseClass : "fail"
                                  });
                              });
                      });
            };
            this.unblock = () => {
                author.unblock({id : this.authorId})
                      .then(( response ) => {
                          if ( response.data.success ) {
                              notify.inform({
                                  message : response.data.message,
                                  duration : 1400
                              });
                              $timeout(1600)
                                  .then(() => {
                                      $scope.$broadcast("formResponse", {
                                          responseClass : "success"
                                      });
                                      document.location.reload();
                                  });
                          } else {
                              console.log(response);
                              $timeout(500)
                                  .then(() => {
                                      $scope.$broadcast("formResponse", {
                                          responseClass : "fail"
                                      });
                                  });
                          }
                      })
                      .catch(( err ) => {
                          console.log(err);
                          $timeout(500)
                              .then(() => {
                                  $scope.$broadcast("formResponse", {
                                      responseClass : "fail"
                                  });
                              });
                      });
            };

        }
    ]);
}
