"use strict";

function heroComponentsInit ( module, constants ) {

    module.directive("heroSection", function () {
            return {
                templateUrl : `${constants.templatesFolder}/section-hero.html`,
                bindToController: true,
                controller: "heroSectionCtrl",
                controllerAs : "hero"
            }
        }
    );
}