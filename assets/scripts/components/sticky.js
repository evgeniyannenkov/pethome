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

                let wideAsElement;

                const getWidth = ( elementWidth, wideAsElement ) => {
                    if ( wideAsElement ) {
                        elementWidth = wideAsElement.offsetWidth;
                    } else {
                        elementWidth = elementWidth || element.prop('offsetWidth');
                    }
                    return elementWidth;
                };

                if ( atts.wideAs ) {
                    wideAsElement = document.querySelector(atts.wideAs);
                }

                _window.on("scroll", function () {

                    elementOffset = elementOffset || element.prop('offsetTop');
                    shouldStuck = $window.pageYOffset > elementOffset - offset;

                    if ( shouldStuck ) {
                        elementWidth = getWidth(elementWidth, wideAsElement);
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
                    elementWidth = getWidth(elementWidth, wideAsElement);
                    element.css("width", elementWidth + "px");
                });
            };
        }
    ]);
}
