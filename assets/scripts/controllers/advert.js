"use strict";

function advertControllersInit ( module ) {

    module.controller('advertsFeedCtrl', [
        "$http", "$scope",
        function ( ajax, $scope ) {
            this.order = "-publicationDate";

            this.getAdverts = ( user_id ) => {
                if ( !user_id ) {
                    ajax({
                        method : "get",
                        url : "/api/advert"
                    }).then(( response ) => {
                        if ( response.data.adverts ) {
                            this.adverts = response.data.adverts;
                        }
                    }).catch(( err ) => {
                        console.log(err);
                    });
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
        "$http", "$scope",
        function ( ajax, $scope ) {
            this.defaults = {
                gender : "",
                type : "",
            };
        }
    ]);

    module.controller('newAdvertCtrl', [
        "$http",
        function ( ajax ) {
            this.advert = {
                gender : "boy",
                type : "dog",
                age : 1
            };
            this.create = () => {
                ajax({
                    method : "post",
                    url : "/api/advert",
                    data : this.advert
                }).then(( response ) => {
                    console.log(response.data);
                }).catch(( err ) => {
                    console.log(err);
                });
            };
        }
    ]);

    module.controller('editAdvertCtrl', [
        "$http", "$scope",
        function ( ajax, $scope ) {
            let requestData = {};
            let current_advert = {};
            this.getAdvert = ( advert_id ) => {
                ajax({
                    method : "get",
                    url : `/api/advert/${advert_id}`
                }).then(( response ) => {
                    if ( response.data.success && response.data.advert ) {
                        this.advert = response.data.advert;
                        if ( this.advert.age ) {
                            this.advert.age = parseInt(this.advert.age);
                        }
                        current_advert = JSON.parse(JSON.stringify(this.advert));
                    }
                }).catch(( err ) => {
                    console.log(err);
                });
            };

            this.getAdvert($scope.advert_id);

            this.save = () => {
                ajax({
                    method : "put",
                    url : `/api/advert/${$scope.advert_id}`,
                    data : this.advert
                }).then(( response ) => {
                    if ( response.data.success && response.data.advert ) {
                        this.advert = response.data.advert;
                        if ( this.advert.age ) {
                            this.advert.age = parseInt(this.advert.age);
                        }
                        current_advert = JSON.parse(JSON.stringify(this.advert));
                    }
                }).catch(( err ) => {
                    console.log(err);
                });
            };

            this.reset = () => {
                this.advert = JSON.parse(JSON.stringify(current_advert));
            };
        }
    ]);

    module.controller('advertRemoveCtrl', [
        "$http", "$scope",
        function ( ajax, $scope ) {
            this.remove = ( _id ) => {
                ajax({
                    method : "get",
                    url : `/api/advert/${_id}/delete`
                }).then(( response ) => {
                    if ( response.data.success && response.data.redirect ) {
                        document.location.href = response.data.redirect;
                    } else if ( response.data.message ) {
                        console.log(response.data);
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
