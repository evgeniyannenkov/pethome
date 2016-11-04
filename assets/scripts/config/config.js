"use strict";

function applicationConfig ( module ) {

    module.provider('$translator', [
        function () {
            this.dictionary = {};

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

            this.translate = function ( content ) {
                return this.dictionary[ this.locale ] && this.dictionary[ this.locale ][ content.toLowerCase() ] || content;
            };

            this.translateAllMatches = function ( content ) {
                var str = "this is [test] line i [want] text [inside] square [brackets]";
                var res = str.replace(/[^[\]]+(?=])/g, ( match ) => {
                    return this.translate(match);
                });
                console.log(res);
                return this.dictionary[ this.locale ] && this.dictionary[ this.locale ][ content.toLowerCase() ] || content;
            };

            this.$get = function () {
                return this;
            };
        }
    ]);

    module.config([
        "$translatorProvider",
        function ( translator ) {
            const preferred = localStorage[ "preferred_language" ] || "ru";
            translator.setTranslations("ru", {
                "Sign Up" : "Регистрация",
                "Login" : "Вход",
                "Admin" : "Управление",
                "Profile" : "Профиль",
                "Logout" : "Выход",
                "Welcome back" : "Хули приперся",
                "test" : "TEESST!",
                "inside" : "INSIDE!!!"
            });

            translator.setLocale(preferred);
        } ]);

    // module.config([
    //     '$translateProvider', function ( $translateProvider ) {
    //         const preferred = localStorage["preferred_language"] || "ru";
    //         $translateProvider.useSanitizeValueStrategy('escape');
    //         $translateProvider.translations('en', {
    //             BUTTON_LANG_EN : 'english',
    //             BUTTON_LANG_RU : 'russian',
    //             BUTTON_LANG_UA : 'ukrainian',
    //             SIGN_UP_BTN : "Sign Up",
    //             LOGIN_BTN : "Login",
    //             HOME_BTN : "Home",
    //             PROFILE_BTN : "Profile",
    //             LOGOUT_BTN : "Logout",
    //             ADMIN_BTN : "Admin",
    //         });
    //         $translateProvider.translations('ru', {
    //             BUTTON_LANG_EN : 'Английский',
    //             BUTTON_LANG_RU : 'Русский',
    //             BUTTON_LANG_UA : 'Українська',
    //             SIGN_UP_BTN : "Регистрация",
    //             LOGIN_BTN : "Вход",
    //             HOME_BTN : "Главная",
    //             PROFILE_BTN : "Профиль",
    //             LOGOUT_BTN : "Выход",
    //             ADMIN_BTN : "Управление",
    //         });
    //         $translateProvider.preferredLanguage(preferred);
    //     }
    // ]);
}