"use strict";

function advertiserControllersInit ( module ) {

    module.controller('advertiserCtrl', [
        "advertiser", "$scope",
        function ( advertiser, $scope ) {
            advertiser.get({ id : $scope.user_id })
                      .then(( response ) => {
                          if ( response.data.success ) {
                              this.info = response.data.advertiser;
                          }
                      })
                      .catch(( response ) => {
                          console.log(response);
                      });
        }
    ]);
    module.controller('advertiserEditCtrl', [
        "advertiser", "$scope", "notify",
        function ( advertiser, $scope, notify ) {

            this.temporary_data = JSON.parse(JSON.stringify($scope.user));

            this.cancel = () => {
                this.temporary_data = JSON.parse(JSON.stringify($scope.user));
            };

            this.edit = () => {
                advertiser.update({ id : $scope.user._id, data : this.temporary_data })
                          .then(( response )=> {
                              if ( response.data.success ) {
                                  notify.success(`Updated  <i class="fa fa-check" aria-hidden="true"></i>`, 1500);
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

    module.controller('advertiserRemoveCtrl', [
        "advertiser", "$scope", "notify",
        function ( advertiser, $scope, notify ) {
            this.remove = () => {
                advertiser.remove({ id : $scope.user._id })
                          .then(( response ) => {
                              if ( response.data.success ) {
                                  notify.success(`Removed  <i class="fa fa-check" aria-hidden="true"></i>`, 1000);
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
