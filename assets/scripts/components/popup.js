"use strict";

function popupComponentsInit ( module, common ) {

    module.directive('popupTrigger', function () {
        return {
            scope : {
                wide : "=",
                petId : "@",
                pet : "=",
                authorId : "@"
            },
            controllerAs : "ctrl",
            bindToController : true,
            controller : [
                "$rootScope",
                function ( $rootScope ) {
                    this.open = ( type ) => {
                        $rootScope.$broadcast("popup_open", {
                            wide : this.wide,
                            petId : this.petId,
                            pet : this.pet,
                            authorId : this.authorId
                        }, type.toLowerCase());

                    };
                }
            ],

            link : ( scope, element, atts, popup ) => {
                element.on("click", function () {
                    popup.open(atts.popupTrigger);
                });
            },
        };
    });

    module.directive('popupContent', function () {
        return {
            scope : {
                expected : "@initial"
            },
            bindToController : true,
            restrict : "AE",
            templateUrl : common.getTemplatePath("popup-content"),
            controller : "popupContentCtrl",
            controllerAs : "popup"
        };
    });
}
