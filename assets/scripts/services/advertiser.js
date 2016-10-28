"use strict";

function advertiserServicesInit ( module ) {
    module.factory('advertiser', [
        "api",
        function ( api ) {

            return api.generate({
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
                        },
                        getAll : {
                            url : ""
                        },
                        getCurrent : {
                            url : "/current"
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