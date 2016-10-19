"use strict";

function authServicesInit ( module ) {
    module.factory('authService', [
        "$http", ( $http ) => {

            const authenticate = (url, data) => {

                return new Promise((resolve, reject) => {
                    $http({
                        method : "post",
                        url : url,
                        data : data
                    }).then(( response ) => {
                        resolve(response);
                    }).catch(( err ) => {
                        reject(err);
                    });
                });
            };

            return {
                authenticate
            }
        }
    ]);
}