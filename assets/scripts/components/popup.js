"use strict";

function popupComponentsInit ( module, constants ) {

    // module.component('popup', {
    //     transclude : {
    //         "trigger" : "popupTrigger",
    //         "content" : "popupContent"
    //     },
    //     templateUrl : `${constants.templatesFolder}/popup.html`,
    //     bindings : {
    //         type : "@",
    //         wide: "="
    //     },
    //     controller : "popupCtrl",
    //     controllerAs : "popup"
    // });

    module.directive('popupTrigger', function () {
        return {
            scope : {
                advertId : "@",
                advert : "="
            },
            controllerAs : "ctrl",
            bindToController : true,
            controller : [
                "popup",
                function ( popup ) {
                    this.open = ( type ) => {
                        popup.open(type, {
                            advertId : this.advertId,
                            advert : this.advert
                        })
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
