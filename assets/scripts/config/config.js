"use strict";

function applicationConfig ( module ) {
    module.config([
        "$translatorProvider",
        function ( translator ) {
            const preferred = localStorage[ "preferred_language" ] || "ru";
            translator.setTranslations("ru", {
                "language" : "язык",
                "russian" : "русский",
                "english" : "английский",
                "ukrainian" : "украинский",
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
                "phone" : "Номер телефона",
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
                "Images added" : "Изображения сохранены",
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
            translator.setTranslations("ua", {
                "language" : "мова",
                "english" : "англійська",
                "russian" : "російська",
                "ukrainian" : "українська",
                "sign up" : "Реєстрація",
                "registration" : "Реєстрація",
                "cancel" : "Cкасувати",
                "login" : "Вхід",
                "admin" : "Адміністрування",
                "profile" : "Профіль",
                "logout" : "Вихід",
                "welcome back" : "З поверненням",
                "welcome" : "Ласкаво просимо",
                "updated" : "Оновлено",
                "reviewed" : "Переглянуто",
                "removed" : "Видалено",
                "created" : "Створено",
                "name" : "Ім'я",
                "type" : "Вид",
                "gender" : "Стать",
                "age" : "Вік",
                "breed" : "Порода",
                "info" : "Інформація",
                "email" : "Пошта",
                "password" : "Пароль",
                "phone" : "Телефон",
                "edit" : "Редагувати",
                "boy" : "Хлопчик",
                "girl" : "Дівчинка",
                "cat" : "Кіт",
                "dog" : "Собака",
                "hamster" : "Хом'як",
                "other" : "Інше",
                "remove" : "Видалити",
                "published" : "Опубліковано",
                "remove advert" : "Видалити оголошення",
                "remove profile" : "Видалити профіль",
                "new advert" : "Створити оголошення",
                "edit advert" : "Редагувати оголошення",
                "edit profile" : "Редагувати профіль",
                "create" : "Створити",
                "Images added" : "Зображення збережені",
                "upload" : "Завантажити",
                "upload all" : "Завантажити всі",
                "general search" : "Загальний пошук",
                "extended search" : "Розширений пошук",
                "both" : "Обидві",
                "all" : "Всі",
                "newer" : "Новіші",
                "older" : "Старіші",
                "date" : "Дата",
                "author" : "Автор",
            });

            translator.setDateFormat("en", "MMM/d/yyyy h:mm a");
            translator.setDateFormat("ru", "d/MM/yyyy H:mm");
            translator.setLocale(preferred);
        } ]);
}