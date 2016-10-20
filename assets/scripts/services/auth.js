"use strict";

function authServicesInit ( module ) {
    module.factory('authService', [
        "$http", ( $http ) => {

            const getRequestData = ( type, data ) => {
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
                    case "logout" :
                        requestData.method = "GET";
                        requestData.url = "/auth/logout";
                        break;
                }

                if ( data ) {
                    requestData.data = data;
                }

                return requestData;

            };

            const authenticate = ( type, data ) => {

                const requestData = getRequestData(type, data);

                return new Promise(( resolve, reject ) => {
                    $http(requestData)
                        .then(( response ) => {
                            resolve(response);
                        })
                        .catch(( err ) => {
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