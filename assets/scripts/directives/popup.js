"use strict";

function popupDirectivesInit ( module ) {
    const templatesFolder = "/assets/templates";

    module.directive('popup', [
        function () {

            return {
                restrict : 'A',
                transclude : {
                    "trigger" : "popupTrigger",
                    "content" : "popupContent"
                },
                templateUrl : `${templatesFolder}/popup.html`,
                scope : {
                    type : "@"
                },
                controller : "popupCtrl",
                controllerAs : "popup",
                link : ( scope, element, attrs, controller ) => {
                    element.on('click', function ( event ) {
                        if ( angular.element(event.target).hasClass("popup") ) {
                            scope.$apply(function () {
                                controller.close();
                            });
                        }
                    });
                }
            };
        }
    ]);
}
