"use strict";

function petServicesInit ( module ) {
    module.factory('pets', [
        "api",
        function ( api ) {

            return api.generate({
                options : {
                    api_base : "/api/pet"
                },
                calls : {
                    "GET" : {
                        get : {
                            url : "/:id"
                        },
                        getFeed : {
                            url : "/feed?limit=:limit&page=:page"
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
                        },
                        review : {
                            url : "/:id/review"
                        }
                    }
                }
            });
        }
    ]);
}