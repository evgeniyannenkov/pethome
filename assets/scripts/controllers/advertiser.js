"use strict";

function advertiserControllersInit ( module ) {

    module.controller('advertiserRemoveCtrl', [
        "advertiser", "$scope",
        function ( advertiser, $scope ) {
            this.remove = ( id ) => {
                advertiser.remove({ id })
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
