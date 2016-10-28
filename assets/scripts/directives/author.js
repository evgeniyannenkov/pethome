"use strict";

function authorDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('author', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/author.html`,
                scope : {
                    user_id : "@author",
                    edit : "=",
                    remove: "="
                },
                controller : "authorCtrl",
                controllerAs : "author"
            };
        }
    ]);

    module.directive('authorEdit', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/author-edit.html`,
                scope : {
                    user : "=authorEdit",
                    popupClose : "&"
                },
                controller : "authorEditCtrl",
                controllerAs : "editor"
            };
        }
    ]);

    module.directive('authorRemove', [
        function () {
            return {
                restrict : 'A',
                templateUrl : `${templatesFolder}/author-remove.html`,
                scope : {
                    user : "=authorRemove",
                    popupClose : "&popupClose"
                },
                controller : "authorRemoveCtrl",
                controllerAs : "remover"
            };
        }
    ]);
}
