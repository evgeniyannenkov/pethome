"use strict";

function advertServicesInit ( module ) {
    module.factory('adverts', [
        "$http", "api",
        ( ajax, api ) => {

            return api.generate({
                options : {
                    api_base : "/api/advert"
                },
                calls : {
                    "GET" : {
                        get : {
                            url : "/:id"
                        },
                        getAll : {},
                        remove : {
                            url : "/:id/delete"
                        }
                    },
                    "POST" : {
                        create : {}
                    },
                    "PUT" : {
                        update : {
                            url : "/:id"
                        }
                    }
                }
            });
        }
    ]);
}