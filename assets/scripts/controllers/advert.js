"use strict";

function advertControllersInit ( module ) {

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
    ])
}
