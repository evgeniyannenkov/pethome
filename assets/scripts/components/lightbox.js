"use strict";

function lightboxComponentsInit ( module, constants ) {

    module.directive("lightboxTrigger", function () {
        return {
            template : `<div ng-transclude></div>
                        <div class="lightbox-trigger__inner" ng-click="lightbox.open();"><i class="fa fa-search-plus" aria-hidden="true"></i></div>`,
            transclude : true,
            controllerAs : "lightbox",
            controller : "lightboxTriggerCtrl",
            link : ( scope, element, atts, ctrl ) => {
                let image = atts.lightboxTrigger;
                element.addClass("lightbox-trigger");
                ctrl.addImage(image);
            }
        };
    });

    module.directive("lightbox", function () {
        return {
            restrict : "AE",
            templateUrl : `${constants.templatesFolder}/lightbox.html`,
            controllerAs : "ctrl",
            controller : "lightboxCtrl"
        };
    });
}
