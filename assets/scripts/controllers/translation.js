"use strict";

function translationControllersInit ( module ) {

    module.controller('translationCtrl', [
        "$scope", "$translate",
        function ( $scope, $translate ) {
            this.changeLanguage = ( key ) => {
                localStorage.setItem("preferred_language", key);
                $translate.use(key);
            };
        }
    ]);

}