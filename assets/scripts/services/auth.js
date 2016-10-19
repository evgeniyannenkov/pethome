"use strict";

function authServicesInit ( module ) {
    module.factory('authService', [
        "$http", ( $http ) => {

            const authenticate = (url, data) => {
                //$http({
                //    method : "post",
                //    url : url,
                //    data : data
                //}).then(( response ) => {
                //    if(response.data.success) {
                //        document.location.reload();
                //    } else {
                //        console.log(`${type}: failed`);
                //        console.log(response);
                //    }
                //}).catch(( err ) => {
                //    if(err.data.success === false) {
                //        console.log(err.data.message);
                //    } else {
                //        console.log(err);
                //    }
                //});
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