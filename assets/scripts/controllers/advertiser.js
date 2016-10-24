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
        "advertiser", "$scope",
        function ( advertiser, $scope ) {

            this.temporary_data = JSON.parse(JSON.stringify($scope.user));

            this.cancel = () => {
                this.temporary_data = JSON.parse(JSON.stringify($scope.user));
            };

            this.edit = () => {
                advertiser.update({ id : $scope.user._id, data : this.temporary_data })
                          .then(( response )=> {
                              if ( response.data.success ) {
                                  $scope.user = JSON.parse(JSON.stringify(this.temporary_data));
                              }
                          })
                          .catch(( error )=> {
                             console.log(error);
                          });
            };
        }
    ]);

    module.controller('advertiserRemoveCtrl', [
        "advertiser", "$scope",
        function ( advertiser, $scope ) {
            this.remove = () => {
                advertiser.remove({id : $scope.user._id})
                          .then(( response ) => {
                              if ( response.data.success ) {
                                  document.location.href = "/";
                              }
                          })
                          .catch(( err ) => {
                              console.log(err);
                          });
            };
        }
    ]);
}
