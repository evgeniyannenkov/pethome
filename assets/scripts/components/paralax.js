"use strict";

function paralaxComponentsInit ( module, constants ) {

    module.directive("ngParalax", [
        "$window", "$document",
        function ( $window ) {
            return ( $scope, $element, $attr ) => {
                let ratio = $attr.ratio || 0.1;
                angular.element($window).bind("scroll", function () {
                    $element.css({
                        transform : "translateY(" + $window.pageYOffset * ratio + "%)"
                    });
                });
            }
        }
    ]);
}