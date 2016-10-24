"use strict";

function advertiserServicesInit ( module ) {
    module.service('advertiser', [
        "api",
        function ( api ) {

            this.api = api.generate({
                options : {
                    api_base : "/api/advertiser"
                },
                calls : {
                    "GET" : {
                        remove : {
                            url : "/:id/delete"
                        },
                        get : {
                            url : "/:id"
                        }
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