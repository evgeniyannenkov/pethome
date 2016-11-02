"use strict";

function applicationConfig ( module ) {
    module.config([
        '$translateProvider', function ( $translateProvider ) {
            const preferred = localStorage["preferred_language"] || "ru";
            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.translations('en', {
                BUTTON_LANG_EN : 'english',
                BUTTON_LANG_RU : 'russian',
                SIGN_UP_BTN : "Sign Up",
                LOGIN_BTN : "Login",
                HOME_BTN : "Home",
                PROFILE_BTN : "Profile",
                LOGOUT_BTN : "Logout",
                ADMIN_BTN : "Admin",
            });
            $translateProvider.translations('ru', {
                BUTTON_LANG_EN : 'Английский',
                BUTTON_LANG_RU : 'Русский',
                SIGN_UP_BTN : "Регистрация",
                LOGIN_BTN : "Вход",
                HOME_BTN : "Главная",
                PROFILE_BTN : "Профиль",
                LOGOUT_BTN : "Выход",
                ADMIN_BTN : "Управление",
            });
            $translateProvider.preferredLanguage(preferred);
        }
    ]);
}