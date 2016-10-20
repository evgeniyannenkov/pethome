"use strict";

function authServicesInit ( module ) {
    module.factory('authService', [
        "$http", ( $http ) => {

            const getRequestData = ( type ) => {
                const requestData = {};

                switch ( type ) {
                    case "login" :
                        requestData.method = "POST";
                        requestData.url = "/auth/login";
                        break;
                    case "registration" :
                        requestData.method = "POST";
                        requestData.url = "/auth";
                        break;
                }

                console.log(type);
                return requestData;

            };

            const authenticate = ( type, data ) => {

                const requestData = getRequestData(type);

                console.log(requestData);

                return new Promise(( resolve, reject ) => {
                    $http({
                        method : requestData.method,
                        url : requestData.url,
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