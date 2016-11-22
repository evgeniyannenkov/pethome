"use strict";

function separatorComponentsInit ( module, constants ) {

    module.directive("pageSeparator", function () {
        return {
            template : `<div class="page-separator"><div class="page-separator__content" ng-transclude></div></div>`,
            transclude : true
        };
    });

}