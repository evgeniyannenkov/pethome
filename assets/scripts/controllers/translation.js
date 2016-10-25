"use strict";

function translationControllersInit ( module ) {

    module.controller('translationCtrl', [
        "$scope", "$translate",
        function ( $scope, $translate ) {
            this.changeLanguage = ( key ) => {
                $translate.use(key);
            };
        }
    ]);

}