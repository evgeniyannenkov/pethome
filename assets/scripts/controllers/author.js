"use strict";

function authorControllersInit ( module ) {

    module.controller('authorCtrl', [
        "author",
        function ( author ) {
            author.get({ id : this.id })
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
    module.controller('authorEditCtrl', [
        "author", "notify", "$scope",
        function ( author, notify, $scope ) {

            $scope.$on("popup_open", ( $event, type ) => {
                if ( type == "profile" ) {
                    this.temporaryData = angular.copy(this.author);
                }
            });

            this.cancel = () => {
                this.temporaryData = angular.copy(this.temporaryData);
                if ( this.popup ) {
                    this.popup.close();
                }
            };

            this.edit = () => {
                author.update({ id : this.author._id, data : this.temporaryData })
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
                          } else {
                              console.log(response);
                          }
                      })
                      .catch(( error ) => {
                          console.log(error);
                      });
            };
        }
    ]);

    module.controller('authorRemoveCtrl', [
        "author", "notify",
        function ( author, notify ) {
            this.remove = () => {
                author.remove({ id : this.author._id })
                      .then(( response ) => {
                          if ( response.data.success ) {
                              notify.inform({
                                  message : `Removed  <i class="fa fa-check" aria-hidden="true"></i>`,
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

            this.cancel = () => {
                if ( this.popup ) {
                    this.popup.close();
                }
            };

        }
    ]);
}
