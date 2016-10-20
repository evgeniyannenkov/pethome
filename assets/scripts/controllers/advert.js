"use strict";

function advertControllersInit ( module ) {
    const api_base = "/api/:schema";
    const schema = "advert";

    module.controller('advertsFeedCtrl', [
        "$http", "$scope", "api",
        function ( ajax, $scope, api ) {
            const adverts = api.generate({
                options : {
                    api_base
                },
                calls : {
                    get : {
                        one : {
                            url : "/:id"
                        },
                        all : {},
                        user : {
                            url : "/:user_id/adverts"
                        }
                    }
                }
            });

            this.order = "-publicationDate";

            this.getAdverts = ( user_id ) => {
                if ( !user_id ) {
                    adverts.all({ schema })
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
                    adverts.user({
                        user_id,
                        schema : "advertiser"
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
        "api",
        function ( api ) {
            const adverts = api.generate({
                options : {
                    api_base
                },
                calls : {
                    post : {
                        create : {}
                    }
                }
            });

            this.advert = {
                gender : "boy",
                type : "dog",
                age : 1
            };
            this.create = () => {
                adverts.create({ schema, data : this.advert })
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
        "$scope", "api",
        function ( $scope, api ) {
            const adverts = api.generate({
                options : {
                    api_base
                },
                calls : {
                    get : {
                        get : {
                            url : "/:id"
                        }
                    },
                    put : {
                        update : {
                            url : "/:id"
                        }
                    }
                }
            });

            let current_advert = {};
            this.save = () => {
                adverts.update({ schema, id : $scope.advert_id, data : this.advert })
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

            adverts.get({ schema, id : $scope.advert_id })
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
        "$scope", "api",
        function ( $scope, api ) {

            const adverts = api.generate({
                options : {
                    api_base
                },
                calls : {
                    get : {
                        remove : {
                            url : "/:id/delete"
                        }
                    }
                }
            });

            this.remove = ( id ) => {
                adverts.remove({ id, schema })
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
