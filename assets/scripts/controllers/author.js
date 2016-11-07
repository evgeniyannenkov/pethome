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
            author.getAll()
                  .then(( response ) => {
                      if ( response.data.success ) {
                          this.authors = response.data.authors;
                      }
                  })
                  .catch(( response ) => {
                      console.log(response);
                  });
        }
    ]);

    module.controller('authorEditCtrl', [
        "author", "notify", "$scope", "$timeout",
        function ( author, notify, $scope, $timeout ) {

            $scope.$on("popup_open", ( $event, type ) => {
                if ( type == "profile" ) {
                    this.temporaryData = angular.copy(this.author);
                }
            });

            this.edit = () => {
                author.update({id : this.author._id, data : this.temporaryData})
                      .then(( response ) => {
                          if ( response.data.success ) {
                              notify.inform({
                                  message : `Updated  <i class="fa fa-check" aria-hidden="true"></i>`,
                                  duration : 1500
                              });
                              this.author = angular.copy(this.temporaryData);
                              if ( this.popup ) {
                                  this.popup.close();
                              }
                              $scope.$broadcast("formResponse", {
                                  responseClass : "",
                                  reset : true
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
        "author", "notify",
        function ( author, notify ) {
            this.remove = () => {
                author.remove({id : this.author._id})
                      .then(( response ) => {
                          if ( response.data.success ) {
                              notify.inform({
                                  message : `[[Removed]]  <i class="fa fa-check" aria-hidden="true"></i>`,
                                  duration : 1000
                              });
                              setTimeout(() => {
                                  document.location.href = "/";
                              }, 1200);
                          }
                      })
                      .catch(( err ) => {
                          console.log(err);
                      });
            };

        }
    ]);

    module.controller('authorBlockCtrl', [
        "author", "notify",
        function ( author, notify ) {

            this.block = () => {
                author.block({id : this.authorId})
                      .then(( response ) => {
                          if ( response.data.success ) {
                              notify.inform({
                                  message : response.data.message,
                                  duration : 1400
                              });
                              setTimeout(()=> {
                                  document.location.reload();
                              }, 1600);
                          } else {
                              console.log(response);
                          }
                      })
                      .catch(( err ) => {
                          console.log(err);
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
                              setTimeout(()=> {
                                  document.location.reload();
                              }, 1600);
                          } else {
                              console.log(response);
                          }
                      })
                      .catch(( err ) => {
                          console.log(err);
                      });
            };

            this.cancel = () => {
                if ( this.popup ) {
                    this.popup.close();
                }
            };

        }
    ]);
}
