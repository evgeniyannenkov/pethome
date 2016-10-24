"use strict";

function apiGenServicesInit ( module ) {
    module.factory("api", [
        "$http",
        function ( ajax ) {

            class Api {
                constructor (settings) {
                    this.options = {
                        api_base : "",
                        url : ""
                    };

                    this.calls = {};

                    return this.generate(settings);
                }

                generateCall ( method, call_options ) {
                    method = method.toUpperCase();
                    call_options.url = call_options.url || this.options.url;

                    let requestData = {
                        method,
                        url : `${this.options.api_base}${call_options.url}`
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
                }

                generate ( settings ) {
                    for ( let option in settings.options ) {
                        if ( settings.options.hasOwnProperty(option) ) {
                            this.options[ option ] = settings.options[ option ];
                        }
                    }

                    for ( let method in settings.calls ) {
                        if ( settings.calls.hasOwnProperty(method) ) {
                            for ( let call in settings.calls[ method ] ) {
                                if ( settings.calls[ method ].hasOwnProperty(call) ) {
                                    this.calls[ call ] = this.generateCall(method, settings.calls[ method ][ call ]);
                                }
                            }
                        }
                    }

                    return this.calls;
                }
            }

            const generate = function ( settings ) {
                return new Api(settings);
            };

            return {
                generate
            }
        }
    ]);
}