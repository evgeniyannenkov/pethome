"use strict";

function authorServicesInit ( module ) {
    module.factory('author', [
        "api",
        function ( api ) {

            return api.generate({
                options : {
                    api_base : "/api/author"
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