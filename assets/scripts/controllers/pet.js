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

            this.niceType = ( type ) => {
                return type ? type.toLowerCase().replace(" ", "-") : type;
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
                                message : `[[Created]] ${response.data.pet.name} <i class="icon-check"></i>`,
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
                                message : `[[Removed]]  <i class="icon-check"></i>`,
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
        "$http", "pets", "author",
        function ( ajax, pets, author ) {

            let value;

            this.order = "desc";
            this.period = "";
            this.gender = "";
            this.type = "";
            this.perPage = "20";
            this.page = 1;

            this.feedData = {
                sort : this.order,
                period : this.period,
                limit : this.perPage,
                page : this.page,
                user : this.id,
                gender : this.gender,
                type : this.type
            };

            author.getAll()
                  .then(( response ) => {
                      this.authors = response.data.authors;
                  });

            this.changeOrder = () => {
                this.feedData.sort = this.order;
                this.feedData.page = 1;
                this.getFeed();
            };

            this.changePeriod = () => {
                this.feedData.period = this.period;
                this.getFeed();
            };

            this.changeGender = () => {
                this.feedData.gender = this.gender;
                this.getFeed();
            };

            this.changeType = () => {
                this.feedData.type = this.type;
                this.getFeed();
            };

            this.changeLimit = () => {
                this.feedData.page = 1;
                this.feedData.limit = this.perPage;
                this.getFeed();
            };

            this.prevPage = () => {
                if ( this.prev ) {
                    this.feedData.page = this.page - 1;
                    this.getFeed();
                }
            };

            this.nextPage = () => {
                value = parseInt(this.page);
                if ( this.next ) {
                    this.feedData.page = this.page + 1;
                    this.getFeed();
                }
            };

            this.goTo = () => {
                value = parseInt(this.page);
                if ( value && value <= this.last ) {
                    this.feedData.page = value;
                } else {
                    this.feedData.page = this.last;
                }
                this.getFeed();
            };

            this.setDefaultValue = () => {
                value = parseInt(this.page);
                if ( !value || value > parseInt(this.last) ) {
                    this.page = 1;
                    this.getFeed();
                }
            };

            this.getFeed = ( data = this.feedData ) => {
                this.inProgress = true;
                pets.getFeed(data)
                    .then(( response ) => {
                        if ( response.data.success && response.data.pets ) {
                            this.pets = response.data.pets;
                            this.next = response.data.next;
                            this.prev = response.data.prev;
                            this.total = response.data.total;
                            this.page = response.data.current;
                            this.last = response.data.last;
                        }
                        this.inProgress = false;
                    })
                    .catch(( err ) => {
                            console.log(err);
                            this.inProgress = false;
                        }
                    );
            };

            this.getFeed();
        }
    ]);

    module.controller('petsSearchCtrl', [
        "pets",
        function ( pets ) {
            this.results = [];

            this.change = () => {
                if ( this.value && this.value.length > 2 ) {
                    this.find(this.value);
                } else {
                    this.results = [];
                }
            };

            this.find = ( value ) => {
                pets.search({ q : value })
                    .then(( response ) => {
                        if ( response.data.success ) {
                            this.results = response.data.results;
                        }
                    })
                    .catch(( error ) => {
                        console.log(error);
                    });
            };

            this.reset = () => {
                this.results = [];
            };
        }
    ]);
}
