"use strict";

function popupComponentsInit ( module, constants ) {

    module.directive('popupTrigger', function () {
        return {
            scope : {
                wide : "=",
                advertId : "@",
                advert : "=",
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
                            advertId : this.advertId,
                            advert : this.advert,
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
            templateUrl : `${constants.templatesFolder}/popup-content.html`,
            controller : "popupContentCtrl",
            controllerAs : "popup"
        };
    });
}
