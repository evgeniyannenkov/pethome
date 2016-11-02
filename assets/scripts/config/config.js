"use strict";

function applicationConfig ( module ) {
    module.config([
        '$translateProvider', function ( $translateProvider ) {
            const preferred = localStorage["preferred_language"] || "ru";
            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.translations('en', {
                BUTTON_LANG_EN : 'english',
                BUTTON_LANG_RU : 'russian',
                BUTTON_LANG_UA : 'ukrainian',
                SIGN_UP_BTN : "Sign Up",
                LOGIN_BTN : "Login",
                HOME_BTN : "Home",
                PROFILE_BTN : "Profile",
                LOGOUT_BTN : "Logout",
            });
            $translateProvider.translations('ru', {
                BUTTON_LANG_EN : 'Английский',
                BUTTON_LANG_RU : 'Русский',
                BUTTON_LANG_UA : 'Українська',
                SIGN_UP_BTN : "Регистрация",
                LOGIN_BTN : "Вход",
                HOME_BTN : "Главная",
                PROFILE_BTN : "Профиль",
                LOGOUT_BTN : "Выход",
            });
            $translateProvider.preferredLanguage(preferred);
        }
    ]);
}