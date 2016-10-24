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
                                  console.log(response.data);
                              }
                          })
                          .catch(( response )=> {
                              console.log(response);
                          });
            };
        }
    ]);

    module.controller('advertiserRemoveCtrl', [
        "advertiser", "$scope",
        function ( advertisers, $scope ) {
            this.remove = ( id ) => {
                advertisers.remove({ id })
                           .then(( response ) => {
                               if ( response.data.success ) {
                                   document.location.href = "/";
                               }
                           })
                           .catch(( err ) => {
                               console.log(err);
                           });
            };
            this.cancel = () => {
                $scope.$parent.$parent.popup.active = false;
            };
        }
    ]);
}
