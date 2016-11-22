"use strict";

function parallaxComponentsInit ( module, constants ) {

    module.directive("ngParallax", [
        "$window", "$document",
        function ( $window ) {
            return ( $scope, $element, $attr ) => {
                let ratio = $attr.ratio || 0.1;
                let parallax = $window.innerWidth >= 700;
                angular.element($window).on("resize", function () {
                    parallax = $window.innerWidth >= 700;
                });

                angular.element($window).on("scroll", function () {
                    if ( parallax ) {
                        $element.css({
                            transform : "translateY(" + $window.pageYOffset * ratio + "%)"
                        });
                    }
                });
            }
        }
    ]);
}