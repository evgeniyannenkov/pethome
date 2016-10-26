"use strict";

function translationControllersInit ( module ) {

    module.controller('translationCtrl', [
        "$scope", "$translate", "advertiser", "currentUser",
        function ( $scope, $translate, advertiser, currentUser ) {

            let current_user;
            currentUser.get(( err, user ) => {
                if ( err ) {
                    console.log(err);
                } else {
                    current_user = user;
                    localStorage.setItem("preferred_language", user.language);
                    $translate.use(user.language);
                }
            });

            this.changeLanguage = ( key ) => {
                localStorage.setItem("preferred_language", key);
                $translate.use(key);
                if ( current_user ) {
                    current_user.language = key;
                    advertiser.update({id : current_user._id, data : current_user});
                }
            };
        }
    ]);

}