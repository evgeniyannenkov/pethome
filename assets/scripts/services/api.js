"use strict";

function apiGenServicesInit ( module ) {
    module.factory("api", [
        "$http", ( ajax ) => {
            let options = {
                api_base : "",
                url : ""
            };

            let calls = {};

            const generateCall = ( method, call_options ) => {
                method = method.toUpperCase();
                call_options.url = call_options.url || options.url;

                let requestData = {
                    method,
                    url : `${options.api_base}${call_options.url}`
                };

                return ( params ) => {

                    for ( let param in params ) {
                        if ( params.hasOwnProperty(param) ) {
                            if ( param !== "data" ) {
                                requestData.url = requestData.url.replace(`:${param}`, params[ param ]);
                            } else if ( method !== "GET" ) {
                                requestData.data = params[ param ];
                            }
                        }
                    }

                    return ajax(requestData);
                };
            };

            const generate = ( settings ) => {
                for ( let option in settings.options ) {
                    if ( settings.options.hasOwnProperty(option) ) {
                        options[ option ] = settings.options[ option ];
                    }
                }

                for ( let method in settings.calls ) {
                    if ( settings.calls.hasOwnProperty(method) ) {
                        for ( let call in settings.calls[ method ] ) {
                            if ( settings.calls[ method ].hasOwnProperty(call) ) {
                                calls[ call ] = generateCall(method, settings.calls[ method ][ call ]);
                            }
                        }
                    }
                }

                return calls;
            };

            return {
                generate
            };
        }
    ]);
}