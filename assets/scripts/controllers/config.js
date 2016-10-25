"use strict";

function applicationConfig ( module ) {
    module.config(['$translateProvider', function ($translateProvider){
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.translations('en', {
            BUTTON_LANG_EN : 'english',
            BUTTON_LANG_RU : 'russian'
        });
        $translateProvider.translations('ru', {
            BUTTON_LANG_EN : 'Английский',
            BUTTON_LANG_RU : 'Русский'
        });
        $translateProvider.preferredLanguage('ru');
    }]);
}