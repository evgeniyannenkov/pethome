"use strict";

function stickyComponentsInit ( module, constants ) {

    module.directive("sticky", [
        "$window", "$document",
        function ( $window, $document ) {
            return ( scope, element, atts ) => {
                let _window = angular.element($window)
                    , elementOffset,
                    shouldStuck,
                    sticky,
                    offset = 100,
                    elementWidth;

                let alignToElement;

                const getWidth = ( elementWidth, wideAsElement ) => {
                    if ( wideAsElement ) {
                        elementWidth = wideAsElement.offsetWidth;
                    } else {
                        elementWidth = elementWidth || element.prop('offsetWidth');
                    }
                    return elementWidth;
                };

                if ( atts.alignTo ) {
                    alignToElement = document.querySelector(atts.alignTo);
                }

                _window.on("scroll", function () {

                    if ( atts.alignTo ) {
                        elementOffset = elementOffset || alignToElement.offsetTop;
                    } else {
                        elementOffset = elementOffset || element.prop('offsetTop');
                    }
                    shouldStuck = $window.pageYOffset > elementOffset - offset;

                    if ( shouldStuck ) {
                        elementWidth = getWidth(elementWidth, alignToElement);
                        element.css({
                            'top' : offset + "px",
                            "position" : "fixed",
                            "width" : elementWidth + "px"
                        });
                        sticky = true;
                    } else if ( !shouldStuck && sticky ) {
                        element.css("position", "static");
                        sticky = false;
                    }
                });

                _window.on("resize", function () {
                    elementWidth = getWidth(elementWidth, alignToElement);
                    element.css("width", elementWidth + "px");
                });
            };
        }
    ]);
}
