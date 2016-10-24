"use strict";

function advertServicesInit ( module ) {
    module.service('adverts', [
        "api",
        function ( api ) {

            this.api = api.generate({
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