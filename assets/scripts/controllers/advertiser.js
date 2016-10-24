"use strict";

function advertiserControllersInit ( module ) {

    module.controller('advertiserCtrl', [
        "advertiser", "$scope",
        function ( advertisers, $scope ) {
            advertisers.get({ id : $scope.user_id })
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
        function ( advertisers, $scope ) {

            this.edit = () => {
                console.log($scope.user);
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
