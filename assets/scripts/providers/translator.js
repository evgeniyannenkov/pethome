"use strict";

function translatorProviderInit ( module ) {

    module.provider('$translator', [
        function () {
            this.dictionary = {};
            this.dateFormats = {
                default : "d/MM/yyyy H:mm"
            };

            this.setLocale = function ( locale ) {
                this.locale = locale
            };

            this.setTranslations = function ( locale, translations ) {
                this.dictionary[ locale ] = this.dictionary[ locale ] || {};

                for ( let key in translations ) {
                    if ( translations.hasOwnProperty(key) ) {
                        this.dictionary[ locale ][ key.toLowerCase() ] = translations[ key ];
                    }
                }
            };

            this.setDateFormat = function ( locale, format ) {
                this.dateFormats[ locale ] = format;
            };

            this.getDateFormat = function ( locale = this.locale ) {
                return this.dateFormats[ locale ] || this.dateFormats.default;
            };

            this.translate = function ( content ) {
                return this.dictionary[ this.locale ] && this.dictionary[ this.locale ][ content.toLowerCase() ] || content;
            };

            this.translateAllMatches = function ( content ) {
                return content.replace(/\[\[(.*?)\]\]/g, ( match ) => {
                    return this.translate(match.substr(2, match.length - 4));
                });
            };

            this.$get = function () {
                return this;
            };
        }
    ]);

}