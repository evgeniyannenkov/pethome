"use strict";

function advertControllersInit ( module ) {

    module.controller('advertsFeedCtrl', [
        "$http", "$scope",
        function ( ajax, $scope ) {
            this.getAdverts = ( user_id ) => {
                if ( !user_id ) {
                    ajax({
                        method : "get",
                        url : "/advert"
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
                        url : `/advertiser/${user_id}/adverts`
                    }).then(( response ) => {
                        console.log(response);
                        if ( response.data.adverts ) {
                            this.adverts = response.data.adverts;
                        }
                    }).catch(( err ) => {
                        console.log(err);
                    })
                }
            };

            this.getAdverts($scope.user_id);
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
                    url : "/advert",
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
            this.getAdvert = ( advert_id ) => {
                ajax({
                    method : "get",
                    url : `/advert/api/${advert_id}`
                }).then(( response ) => {
                    if ( response.data.success && response.data.advert ) {
                        console.log(response.data.advert);
                        this.advert = response.data.advert;
                    }
                }).catch(( err ) => {
                    console.log(err);
                });
            };

            this.getAdvert($scope.advert_id);

            this.save = () => {
                ajax({
                    method : "put",
                    url : `/advert/api/${$scope.advert_id}`,
                    data : this.advert
                }).then(( response ) => {
                    if ( response.data.success && response.data.advert ) {
                        this.advert = response.data.advert;
                    }
                }).catch(( err ) => {
                    console.log(err);
                });
                console.log(this.advert);
            };
        }
    ]);
}
