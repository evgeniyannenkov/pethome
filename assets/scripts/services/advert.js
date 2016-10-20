"use strict";

function advertServicesInit ( module ) {
    module.factory('adverts', [
        "$http", ( ajax ) => {

            const getRequestData = ( data ) => {
                const requestData = {};
                const api_base = "/api/advert";

                switch ( data.type ) {
                    case "get" :
                        requestData.method = "get";
                        requestData.url = `${api_base}/${data._id}`;
                        break;
                    case "getAll" :
                        requestData.method = "get";
                        requestData.url = api_base;
                        break;
                    case "update" :
                        requestData.method = "put";
                        requestData.url = `${api_base}/${data._id}`;
                        break;
                    case "create" :
                        requestData.method = "post";
                        requestData.url = `${api_base}`;
                        break;
                    case "remove" :
                        requestData.method = "get";
                        requestData.url = `${api_base}/${data._id}/delete`;
                        break;
                }

                if ( data.requestData ) {
                    requestData.data = data.requestData;
                }

                return requestData;
            };

            const makeApiCall = ( data ) => {
                const requestData = getRequestData(data);

                return ajax(requestData);
            };

            const get = ( _id ) => {
                return makeApiCall({ type : "get", _id })
            };

            const getAll = () => {
                return makeApiCall({ type : "getAll" });
            };

            const create = ( requestData ) => {
                return makeApiCall({ type : "create", requestData });
            };

            const update = ( _id, requestData ) => {
                return makeApiCall({ type : "update", _id, requestData });
            };

            const remove = ( _id ) => {
                return makeApiCall({ type : "remove", _id });
            };

            return {
                get,
                getAll,
                create,
                update,
                remove
            };
        }
    ]);
}