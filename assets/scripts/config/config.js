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
                return content.replace(/\[\[(.*?)\]\]/g, ( match ) => {
                    return this.translate(match.substr(2, match.length - 4));
                });
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
                "sign up" : "Регистрация",
                "registration" : "Регистрация",
                "cancel" : "Отмена",
                "login" : "Вход",
                "admin" : "Управление",
                "profile" : "Профиль",
                "logout" : "Выход",
                "welcome back" : "С возвращением",
                "welcome" : "Добро пожаловать",
                "updated" : "Обновлен",
                "reviewed" : "Просмотрено",
                "removed" : "Удалено",
                "created" : "Создано",
                "name" : "Имя",
                "type" : "Вид",
                "gender" : "Пол",
                "age" : "Возраст",
                "breed" : "Порода",
                "info" : "Информация",
                "email" : "Почта",
                "password" : "Пароль",
                "phone number" : "Номер телефона",
                "edit" : "Изменить",
                "boy" : "Мальчик",
                "girl" : "Девочка",
                "cat" : "Кот",
                "dog" : "Собака",
                "hamster" : "Хомяк",
                "other" : "Другой",
                "remove" : "Удалить",
                "published" : "Опубликовано",
                "remove advert" : "Удалить обьявление",
                "remove profile" : "Удалить аккаунт",
                "new advert" : "Новое обьявление",
                "edit advert" : "Редактировать обьявление",
                "edit profile" : "Редактировать профиль",
                "create" : "Создать",
                "upload" : "Загрузить",
                "upload all" : "Загрузить все",
                "general search" : "Общий поиск",
                "extended search" : "Расширенный поиск",
                "both" : "Оба",
                "all" : "Все",
                "newer" : "Новее",
                "older" : "Старее",
                "date" : "Дата",
                "author" : "Автор",
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