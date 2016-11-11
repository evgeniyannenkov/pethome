"use strict";

function translatorProviderInit ( module ) {

    module.provider('$translator', [
        function () {
            this.regex = {
                match : /\[\[(.*?)\]\]/g,
                word : /\b[^\d\W]+\b/g
            };
            this.dictionary = {};
            this.dateFormats = {
                default : "d/MM/yyyy H:mm",
                defaultTime : "H:mm",
                defaultDate : "d/MM/yyyy"
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

            this.setFullDateFormat = function ( locale, format ) {
                this.dateFormats[ locale + "-full" ] = format;
            };

            this.setDateFormat = function ( locale, format ) {
                this.dateFormats[ locale + "-date" ] = format;
            };

            this.setTimeFormat = function ( locale, format ) {
                this.dateFormats[ locale + "-time" ] = format;
            };

            this.getFullDateFormat = function ( locale = this.locale ) {
                return this.dateFormats[ locale + "-full" ] || this.dateFormats.default;
            };

            this.getDateFormat = function ( locale = this.locale ) {
                return this.dateFormats[ locale + "-date" ] || this.dateFormats.defaultDate;
            };

            this.getTimeFormat = function ( locale = this.locale ) {
                return this.dateFormats[ locale + "-time" ] || this.dateFormats.defaultTime;
            };

            this.translate = function ( content ) {
                return this.dictionary[ this.locale ] && this.dictionary[ this.locale ][ content.toLowerCase() ] || content;
            };

            this.translateAllMatches = function ( content ) {
                return content.replace(this.regex.match, ( match ) => {
                    return this.translate(match.substr(2, match.length - 4));
                });
            };

            this.translateAllWords = function ( content ) {
                return content.replace(this.regex.word, ( match ) => {
                    return this.translate(match);
                });
            };

            this.translateAll = function ( content ) {
                return this.translateAllWords(this.translateAllMatches(content));
            };

            this.$get = function () {
                return this;
            };
        }
    ]);

}