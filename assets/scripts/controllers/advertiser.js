"use strict";

function advertiserControllersInit ( module ) {

    module.controller('advertiserCtrl', [
        "advertiser", "$scope",
        function ( advertiser, $scope ) {
            advertiser.get({id : $scope.user_id})
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

            this.edit = () => {
                advertiser.update({id : $scope.user._id, data : $scope.user})
                          .then(( response )=> {
                              console.log(response.data);
                          })
                          .catch(( response )=> {
                              console.log(response);
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
