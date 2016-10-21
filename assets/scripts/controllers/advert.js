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
                        console.log(response);
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
        "adverts",
        function ( adverts ) {
            this.advert = {
                gender : "boy",
                type : "dog",
                age : 1
            };
            this.create = () => {
                adverts.create({ data : this.advert })
                       .then(( response ) => {
                           if ( response.data.success ) {
                               document.location.href = `/advert/${response.data.advert._id}`;
                           }
                       })
                       .catch(( err ) => {
                           console.log(err);
                       });
            };
        }
    ]);

    module.controller('editAdvertCtrl', [
        "$scope", "adverts",
        function ( $scope, adverts ) {

            let current_advert = {};
            this.save = () => {
                adverts.update({ id : $scope.advert_id, data : this.advert })
                       .then(( response ) => {
                           if ( response.data.success && response.data.advert ) {
                               this.advert = response.data.advert;
                               if ( this.advert.age ) {
                                   this.advert.age = parseInt(this.advert.age);
                               }
                               current_advert = JSON.parse(JSON.stringify(this.advert));
                           }
                       })
                       .catch(( err ) => {
                           console.log(err);
                       });
            };
            this.reset = () => {
                this.advert = JSON.parse(JSON.stringify(current_advert));
            };

            adverts.get({ id : $scope.advert_id })
                   .then(( response ) => {
                       if ( response.data.success && response.data.advert ) {
                           this.advert = response.data.advert;
                           if ( this.advert.age ) {
                               this.advert.age = parseInt(this.advert.age);
                           }
                           current_advert = JSON.parse(JSON.stringify(this.advert));
                       }
                   })
                   .catch(( err ) => {
                       console.log(err);
                   });
        }
    ]);

    module.controller('advertRemoveCtrl', [
        "$scope", "adverts",
        function ( $scope, adverts ) {
            this.remove = ( id ) => {
                adverts.remove({ id })
                       .then(( response ) => {
                           if ( response.data.success && response.data.redirect ) {
                               document.location.href = response.data.redirect;
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
