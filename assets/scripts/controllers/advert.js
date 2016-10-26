"use strict";

function advertControllersInit ( module ) {

    module.controller('advertsFeedCtrl', [
        "$http", "$scope", "adverts",
        function ( ajax, $scope, adverts ) {
            this.order = "-publicationDate";

            this.getAdverts = ( user_id ) => {
                if ( !user_id ) {
                    adverts.getAll()
                           .then(( response ) => {
                               if ( response.data.adverts ) {
                                   this.adverts = response.data.adverts;
                               }
                           })
                           .catch(( err ) => {
                                   console.log(err);
                               }
                           );

                } else {
                    ajax({
                        method : "get",
                        url : `/api/advertiser/${user_id}/adverts`
                    }).then(( response ) => {
                        if ( response.data.adverts ) {
                            this.adverts = response.data.adverts;
                        }
                    }).catch(( err ) => {
                        console.log(err);
                    });
                }
            };

            this.getAdverts($scope.user_id);
        }
    ]);

    module.controller('advertsFeedFilterCtrl', [
        function () {
            this.defaults = {
                gender : "",
                type : "",
            };
        }
    ]);

    module.controller('newAdvertCtrl', [
        "adverts", "notify", "$timeout",
        function ( adverts, notify, $timeout ) {
            this.advert = {
                gender : "boy",
                type : "dog",
                age : 1
            };
            this.create = () => {
                adverts.create({ data : this.advert })
                       .then(( response ) => {
                           if ( response.data.success ) {
                               notify.success({
                                   message : `Created ${response.data.advert.name} <i class="fa fa-check" aria-hidden="true"></i>`,
                                   duration : 1200
                               });
                               setTimeout(function () {
                                   document.location.href = `/advert/${response.data.advert._id}`;
                               }, 1500);
                           }
                       })
                       .catch(( err ) => {
                           console.log(err);
                       });
            };
        }
    ]);

    module.controller('editAdvertCtrl', [
        "$scope", "adverts", "notify",
        function ( $scope, adverts, notify ) {

            this.temporaryData = JSON.parse(JSON.stringify($scope.advertData));

            this.save = () => {
                adverts.update({ id : $scope.advertData._id, data : this.temporaryData })
                       .then(( response ) => {
                           notify.success({
                               message : `Updated  <i class="fa fa-check" aria-hidden="true"></i>`,
                               duration : 1500
                           });
                           if ( response.data.success && response.data.advert ) {
                               $scope.advertData = response.data.advert;
                               if ( $scope.advertData.age ) {
                                   $scope.advertData.age = parseInt($scope.advertData.age);
                               }
                               $scope.popupClose();
                           }
                       })
                       .catch(( err ) => {
                           console.log(err);
                       });
            };
            this.cancel = () => {
                this.temporaryData = JSON.parse(JSON.stringify($scope.advertData));
            };
        }
    ]);


    module.controller('advertCtrl', [
        "$scope", "adverts",
        function ( $scope, adverts ) {

            let current_advert = {};

            adverts.get({ id : $scope.advert_id })
                   .then(( response ) => {
                       if ( response.data.success && response.data.advert ) {
                           this.advertData = response.data.advert;
                           if ( this.advertData.age ) {
                               this.advertData.age = parseInt(this.advertData.age);
                           }
                           current_advert = JSON.parse(JSON.stringify(this.advertData));
                       }
                   })
                   .catch(( err ) => {
                       console.log(err);
                   });
        }
    ]);

    module.controller('advertRemoveCtrl', [
        "$scope", "adverts", "notify",
        function ( $scope, adverts, notify ) {
            this.remove = ( id ) => {
                adverts.remove({ id })
                       .then(( response ) => {
                           if ( response.data.success && response.data.redirect ) {
                               notify.success({
                                   message : `Removed  <i class="fa fa-check" aria-hidden="true"></i>`,
                                   duration : 1200
                               });
                               setTimeout(()=> {
                                   document.location.href = response.data.redirect;
                               }, 1200);
                           } else if ( response.data.message ) {
                               console.log(response.data);
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
