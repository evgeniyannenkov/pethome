"use strict";

function authorControllersInit ( module ) {

    module.controller('authorCtrl', [
        "author", "$scope",
        function ( author, $scope ) {
            author.get({ id : $scope.user_id })
                      .then(( response ) => {
                          if ( response.data.success ) {
                              this.info = response.data.author;
                          }
                      })
                      .catch(( response ) => {
                          console.log(response);
                      });
        }
    ]);
    module.controller('authorEditCtrl', [
        "author", "$scope", "notify",
        function ( author, $scope, notify ) {

            this.temporary_data = JSON.parse(JSON.stringify($scope.user));

            this.cancel = () => {
                this.temporary_data = JSON.parse(JSON.stringify($scope.user));
            };

            this.edit = () => {
                author.update({ id : $scope.user._id, data : this.temporary_data })
                          .then(( response )=> {
                              if ( response.data.success ) {
                                  notify.inform({
                                      message : `Updated  <i class="fa fa-check" aria-hidden="true"></i>`,
                                      duration : 1500
                                  });
                                  $scope.user = JSON.parse(JSON.stringify(this.temporary_data));
                                  $scope.popupClose();
                              }
                          })
                          .catch(( error )=> {
                              console.log(error);
                          });
            };
        }
    ]);

    module.controller('authorRemoveCtrl', [
        "author", "$scope", "notify",
        function ( author, $scope, notify ) {
            this.remove = () => {
                author.remove({ id : $scope.user._id })
                          .then(( response ) => {
                              if ( response.data.success ) {
                                  notify.inform({
                                      message : `Removed  <i class="fa fa-check" aria-hidden="true"></i>`,
                                      duration : 1000
                                  });
                                  setTimeout(()=> {
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
}
