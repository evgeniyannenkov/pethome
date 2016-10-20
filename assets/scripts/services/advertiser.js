"use strict";

function advertiserServicesInit ( module ) {
    module.factory('advertiser', [
        "$http", ( $http ) => {

            const get = () => {
                //return new Promise((resolve, reject) => {
                //
                //})
                $http({
                    method : "GET",
                    url : url,
                    data : data
                }).then(( response ) => {
                    console.log(response);
                }).catch(( err ) => {
                    console.log(err);
                });
            };

            const save = () => {

            };

            const remove = () => {

            };

            const update = () => {

            };

            return {
                get,
                save,
                remove,
                update
            }
        }
    ]);
}