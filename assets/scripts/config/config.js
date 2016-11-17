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
                "edit" : "Редактировать",
                "male" : "Мужской",
                "female" : "Женский",
                "dog" : "Собака",
                "cat" : "Кот",
                "bird" : "Птица",
                "rabbit" : "Кролик",
                "fish" : "Рыба",
                "ferret" : "Хорёк",
                "guinea pig" : "Морская свинка",
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
                "remove all" : "Стереть всё",
                "general search" : "Общий поиск",
                "extended search" : "Расширенный поиск",
                "both" : "Оба",
                "all" : "Все",
                "Newest first" : "Сначала новые",
                "Oldest first" : "Сначала старые",
                "author" : "Автор",
                "go to" : "Перейти",
                "not specified" : "Не указано",
                "read more" : "Детальнее",
                "Set as main image" : "Сделать основным изображением",
                "add photos" : "Добавить фотографии",
                "add photos from your computer" : "Добавить фотографии со своего компьютера",
                "sort" : "сортировать",
                "show" : "показать",
                "all adverts" : "Все обьявления",
                "last day" : "За последний день",
                "last 3 days" : "За три дня",
                "last week" : "За неделю",
                "last month" : "За месяц",

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
                "male" : "Чоловіча",
                "female" : "Жіноча",
                "dog" : "Собака",
                "cat" : "Кіт",
                "bird" : "Птах",
                "rabbit" : "Кролик",
                "fish" : "Риба",
                "ferret" : "Тхір",
                "guinea pig" : "Морська свинка",
                "hamster" : "Хом'як",
                "other" : "Інший",
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
                "upload all" : "Завантажити",
                "remove all" : "Видалити",
                "general search" : "Загальний пошук",
                "extended search" : "Розширений пошук",
                "both" : "Обидві",
                "all" : "Всі",
                "Newest first" : "Спочатку нові",
                "Oldest first" : "Спочатку старі",
                "date" : "Дата",
                "author" : "Автор",
                "go to" : "Перейти",
                "not specified" : "Не вказано",
                "read more" : "Детальніше",
                "Set as main image" : "Зробити основним зображенням",
                "add photos" : "Додати фото",
                "add photos from your computer" : "фото з комп'ютера",
                "sort" : "сортувати",
                "show" : "показати",
                "all adverts" : "Всі оголошення",
                "last day" : "За останній день",
                "last 3 days" : "За три дні",
                "last week" : "За тиждень",
                "last month" : "За місяць",

            });

            translator.setFullDateFormat("en", "MMM/d/yyyy h:mm a");
            translator.setFullDateFormat("ru", "d/MM/yyyy H:mm");
            translator.setDateFormat("en", "MMM/d/yyyy");
            translator.setTimeFormat("en", "h:mm a");
            translator.setDateFormat("ru", "d/MM/yyyy");
            translator.setTimeFormat("ru", "H:mm");
            translator.setLocale(preferred);
        } ]);
}