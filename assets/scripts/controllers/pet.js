"use strict";

function petControllersInit ( module ) {

    module.controller('petCtrl', [
        "pets", "author", "notify", "lightboxService",
        function ( pets, author, notify, lightbox ) {

            let current_pet = {};

            this.showActions = false;

            pets.get({ id : this.id })
                .then(( response ) => {
                    if ( response.data.success && response.data.pet ) {
                        this.fields = response.data.pet;
                        if ( this.fields.age ) {
                            this.fields.age = parseInt(this.fields.age);
                        }
                        current_pet = angular.copy(this.fields);

                        author.get({ id : this.fields.author })
                              .then(( response ) => {
                                  if ( response.data.success ) {
                                      this.author = response.data.author;

                                      this.showActions = this.currentUser && ( this.author._id == this.currentUser.id || this.currentUser.isAdmin);
                                  }
                              });
                    }
                })
                .catch(( err ) => {
                    console.log(err);
                });

            this.save = ( data = this.fields ) => {
                return new Promise(( resolve, reject ) => {
                    pets.update({ id : data._id, data })
                        .then(( response ) => {
                            if ( response.data.success && response.data.newPet ) {
                                notify.inform({
                                    message : `${data.name} [[updated]].`,
                                    duration : 2000
                                });

                                this.fields = response.data.newPet;
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
                lightbox.removeImage(image);
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
                pets.review({ id : this.id })
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

    module.controller('newPetCtrl', [
        "$scope", "pets", "notify", "$timeout",
        function ( $scope, pets, notify, $timeout ) {
            this.pet = {
                gender : "male",
                type : "dog",
                age : 1
            };

            this.create = () => {
                pets.create({ data : this.pet })
                    .then(( response ) => {
                        if ( response.data.success ) {
                            notify.inform({
                                message : `[[Created]] ${response.data.pet.name} <i class="fa fa-check" aria-hidden="true"></i>`,
                                duration : 1200
                            });
                            $timeout(1500)
                                .then(() => {
                                    $scope.$broadcast("formResponse", {
                                        responseClass : "success"
                                    });
                                    document.location.href = `/pet/${response.data.pet._id}`;
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

    module.controller('editPetCtrl', [
        "$scope", "$rootScope",
        function ( $scope, $rootScope ) {

            $rootScope.$on("popup_open", ( event, data, type ) => {
                if ( type == "edit pet" ) {
                    this.temporaryData = angular.copy(this.pet.fields);
                    $scope.$apply();
                }
            });

            this.update = () => {
                this.pet.save(this.temporaryData)
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

    module.controller('petRemoveCtrl', [
        "$scope", "pets", "notify", "$timeout",
        function ( $scope, pets, notify, $timeout ) {
            this.remove = ( id ) => {
                pets.remove({ id })
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

    module.controller('petsFeedCtrl', [
        "$http", "pets", "author", "$scope",
        function ( ajax, pets, author, $scope ) {

            this.order = "-publicationDate";
            this.limit = 10;
            this.number = 10;

            author.getAll()
                  .then(( response ) => {
                      this.authors = response.data.authors;
                  });

            this.getPets = ( user_id ) => {
                if ( !user_id ) {
                    pets.getAll()
                        .then(( response ) => {
                            if ( response.data.pets ) {
                                this.pets = response.data.pets;
                            }
                        })
                        .catch(( err ) => {
                                console.log(err);
                            }
                        );

                } else {
                    ajax({
                        method : "get",
                        url : `/api/author/${user_id}/pets`
                    }).then(( response ) => {
                        if ( response.data.pets ) {
                            this.pets = response.data.pets;
                        }
                    }).catch(( err ) => {
                        console.log(err);
                    });
                }
            };

            this.getPets(this.id);

            this.loadMore = ( number = this.number ) => {
                this.limit += number;
                $scope.$apply();
            };
        }
    ]);

    module.controller('petsFeedFilterCtrl', [
        "$filter",
        function ( $filter ) {

            this.defaults = {
                gender : "",
                type : "",
            };

            this.checkGeneral = () => {
                this.fields.title = this.fields.general;
            };

            this.fieldChange = ( field ) => {
                if ( field !== "type" && field !== "gender" && this.fields[ field ] == "" ) {
                    this.fields[ field ] = undefined;
                }
            };

            this.toggleSearch = () => {
                this.extended = !this.extended;
                this.fields = this.defaults;
            }

        }
    ]);
}
