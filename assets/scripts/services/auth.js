"use strict";

function authServicesInit ( module ) {
    module.factory('authService', [
        "$http", "api", ( $http, api ) => {

            const authApi = api.generate({
                options : {
                    api_base : "/auth"
                },
                calls : {
                    "GET" : {
                        logout : {
                            url : "/logout"
                        }
                    },
                    "POST" : {
                        login : {
                            url : "/login"
                        },
                        registration : {}
                    }
                }
            });

            const authenticate = ( type, data ) => {
                return authApi[type]({data : data});
            };

            return {
                authenticate
            }
        }
    ]);
}