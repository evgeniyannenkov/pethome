"use strict";

function translationControllersInit ( module ) {

    module.controller('translationCtrl', [
        "$scope", "$translator", "author", "currentUser",
        function ( $scope, $translator, author, currentUser ) {

            let current_user;
            this.key = localStorage[ "preferred_language" ] || 'ru';
            currentUser.get(( err, user ) => {
                if ( err ) {
                    console.log(err);
                } else {
                    current_user = user;
                    localStorage.setItem("preferred_language", user.language);
                    $translator.setLocale(user.language);
                    this.key = user.language;
                }
            });

            this.changeLanguage = ( key ) => {
                localStorage.setItem("preferred_language", key);
                this.key = key;
                $translator.setLocale(key);
                if ( current_user ) {
                    current_user.language = key;
                    author.update({ id : current_user._id, data : current_user });
                }
            };
        }
    ]);

}