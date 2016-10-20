"use strict";

function advertiserServicesInit ( module ) {
    module.factory('advertiser', [
        "$http", ( $http ) => {

            const getRequestData = ( data ) => {
                const requestData = {};
                const apiBase = "/api/advertiser";

                switch ( data.type ) {
                    case "get" :
                        break;
                    case "update" :
                        break;
                    case "remove" :
                        requestData.method = "GET";
                        requestData.url = `${apiBase}/${data.id}/delete`;
                        break;
                }

                if ( data.bodyData ) {
                    requestData.data = data.bodyData;
                }

                return requestData;

            };

            const makeApiCall = ( data )=> {
                const requestData = getRequestData(data);
                return $http(requestData);
            };

            const get = () => {

            };

            const save = () => {

            };

            const remove = ( id ) => {
                return makeApiCall({type : "remove", id});
            };

            const update = () => {

            };

            return {
                get,
                save,
                remove,
                update
            }
        }
    ]);
}