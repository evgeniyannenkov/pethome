"use strict";

function advertiserControllersInit ( module ) {

    module.controller('advertiserRemoveCtrl', [
        "$http", "$scope",
        function ( ajax, $scope ) {
            this.remove = ( _id ) => {
                ajax({
                    method : "get",
                    url : `/api/advertiser/${_id}/delete`
                }).then(( response ) => {
                    if ( response.data.success ) {
                        document.location.href = "/";
                    }
                }).catch(( err ) => {
                    console.log(err);
                });
            };
            this.cancel = () => {
                $scope.$parent.$parent.popup.active = false;
            };
        }
    ]);
}
