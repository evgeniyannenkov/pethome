"use strict";

function applicationConfig ( module ) {
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

            translator.setDateFormat("en", "MMM/d/yyyy h:mm a");
            translator.setDateFormat("ru", "d/MM/yyyy H:mm");
            translator.setLocale(preferred);
        } ]);
}