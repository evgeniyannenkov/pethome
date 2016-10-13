"use strict";

function advertControllersInit ( module ) {

    module.controller('advertsFeedCtrl', [
        "$http",
        function ( ajax ) {
            this.getAdverts = () => {
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
            };

            this.getAdverts();
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
}
