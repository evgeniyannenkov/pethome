"use strict";

function advertControllersInit ( module ) {

    module.controller('advertCtrl', [
        "adverts", "notify",
        function ( adverts, notify ) {

            let current_advert = {};

            adverts.get({ id : this.id })
                   .then(( response ) => {
                       if ( response.data.success && response.data.advert ) {
                           this.fields = response.data.advert;
                           if ( this.fields.age ) {
                               this.fields.age = parseInt(this.fields.age);
                           }
                           current_advert = angular.copy(this.fields);
                       }
                   })
                   .catch(( err ) => {
                       console.log(err);
                   });

            this.save = ( data = this.fields ) => {
                return new Promise(( resolve, reject ) => {
                    adverts.update({ id : data._id, data })
                           .then(( response ) => {
                               if ( response.data.success && response.data.newAdvert ) {
                                   notify.inform({
                                       message : `${data.name} [[updated]].`,
                                       duration : 2000
                                   });

                                   this.fields = response.data.newAdvert;
                                   if ( this.fields.age ) {
                                       this.fields.age = parseInt(this.fields.age);
                                   }
                                   resolve(this.fields);
                               } else {
                                   notify.error({
                                       message : response.data.message,
                                       duration : 2000
                                   });
                               }
                           })
                           .catch(( error ) => {
                               reject(error);
                           });
                });
            };

            this.removeImage = ( image ) => {
                image = image.startsWith("/") ? image.substr(1, image.length - 1) : image;
                this.fields.images = this.fields.images.filter(function ( element ) {
                    if ( image !== element ) {
                        return element;
                    }
                });
                this.save();
            };

            this.changeState = () => {
                this.fields.published = !this.fields.published;
                this.save();
            };

            this.setMainImage = ( image ) => {
                image = image.startsWith("/") ? image.substr(1, image.length - 1) : image;
                if ( image && this.fields.images.indexOf(image) != -1 ) {
                    this.fields.mainImage = image;
                    this.save();
                }
            };

            this.isMainImage = ( image ) => {
                return image == this.fields.mainImage;
            };

            this.review = () => {
                adverts.review({ id : this.id })
                       .then(( response ) => {
                           if ( response.data.success ) {
                               this.fields.reviewed = true;
                               notify.inform({
                                   message : response.data.message,
                                   duration : 2000
                               });
                           }
                       })
                       .catch(( response ) => {
                           console.log(response);
                       });
            };
        }
    ]);

    module.controller('newAdvertCtrl', [
        "$scope", "adverts", "notify", "$timeout",
        function ( $scope, adverts, notify, $timeout ) {
            this.advert = {
                gender : "male",
                type : "dog",
                age : 1
            };

            this.create = () => {
                adverts.create({ data : this.advert })
                       .then(( response ) => {
                           if ( response.data.success ) {
                               notify.inform({
                                   message : `[[Created]] ${response.data.advert.name} <i class="fa fa-check" aria-hidden="true"></i>`,
                                   duration : 1200
                               });
                               $timeout(1500)
                                   .then(() => {
                                       $scope.$broadcast("formResponse", {
                                           responseClass : "success"
                                       });
                                       document.location.href = `/advert/${response.data.advert._id}`;
                                   });
                           } else {
                               notify.error({
                                   message : response.data.message,
                                   duration : 3000
                               });
                               $timeout(500)
                                   .then(() => {
                                       $scope.$broadcast("formResponse", {
                                           responseClass : "fail"
                                       });
                                   });
                           }
                       })
                       .catch(( err ) => {
                           console.log(err);
                           $timeout(500)
                               .then(() => {
                                   $scope.$broadcast("formResponse", {
                                       responseClass : "fail"
                                   });
                               });
                       });
            };

        }
    ]);

    module.controller('editAdvertCtrl', [
        "$scope", "$rootScope",
        function ( $scope, $rootScope ) {

            $rootScope.$on("popup_open", ( event, data, type ) => {
                if ( type == "edit advert" ) {
                    this.temporaryData = angular.copy(this.advert.fields);
                    $scope.$apply();
                }
            });

            this.update = () => {
                this.advert.save(this.temporaryData)
                    .then(() => {
                        $scope.$broadcast("formResponse", {
                            responseClass : "",
                            reset : true
                        });

                    })
                    .catch(( error ) => {
                        console.log(error);
                        $timeout(500)
                            .then(() => {
                                $scope.$broadcast("formResponse", {
                                    responseClass : "fail"
                                });
                            });
                    });
            };

        }
    ]);

    module.controller('advertRemoveCtrl', [
        "$scope", "adverts", "notify", "$timeout",
        function ( $scope, adverts, notify, $timeout ) {
            this.remove = ( id ) => {
                adverts.remove({ id })
                       .then(( response ) => {
                           if ( response.data.success && response.data.redirect ) {
                               notify.inform({
                                   message : `[[Removed]]  <i class="fa fa-check" aria-hidden="true"></i>`,
                                   duration : 1200
                               });
                               $timeout(1200)
                                   .then(() => {
                                       $scope.$broadcast("formResponse", {
                                           responseClass : "success"
                                       });
                                       document.location.href = response.data.redirect;
                                   });
                           } else if ( response.data.message ) {
                               console.log(response.data);
                           }
                       })
                       .catch(( err ) => {
                           console.log(err);

                           $timeout(500)
                               .then(() => {
                                   $scope.$broadcast("formResponse", {
                                       responseClass : "fail"
                                   });
                               });
                       });
            };

        }
    ]);

    module.controller('advertsFeedCtrl', [
        "$http", "adverts", "author",
        function ( ajax, adverts, author ) {
            this.order = "-publicationDate";

            author.getAll()
                  .then(( response ) => {
                      this.authors = response.data.authors;
                  });

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
                        url : `/api/author/${user_id}/adverts`
                    }).then(( response ) => {
                        if ( response.data.adverts ) {
                            this.adverts = response.data.adverts;
                        }
                    }).catch(( err ) => {
                        console.log(err);
                    });
                }
            };

            this.getAdverts(this.id);
        }
    ]);

    module.controller('advertsFeedFilterCtrl', [
        function () {
            this.defaults = {
                gender : "",
                type : "",
            };

            this.fieldChange = ( field ) => {
                if ( field !== "type" && field !== "gender" && this.fields[ field ] == "" ) {
                    this.fields[ field ] = undefined;
                }
            };

            this.toggleSearch = () => {
                this.extended = !this.extended;
                if ( this.extended ) {
                    this.fields = this.defaults;
                } else {
                    this.fields = "";
                }
            }

        }
    ]);
}
