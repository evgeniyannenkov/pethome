"use strict";

function stickyComponentsInit ( module, constants ) {

    module.directive("sticky", [
        "$window",
        function ( $window ) {
            return {
                controller : function () {

                },
                link : ( scope, element, atts ) => {
                    console.log(atts.wideAs);
                    let _window = angular.element($window)
                        , elementOffset,
                        shouldStuck,
                        sticky,
                        offset = 100,
                        elementWidth;

                    _window.on("scroll", function () {
                        elementOffset = elementOffset || element.prop('offsetTop');
                        elementWidth = elementWidth || element.prop('offsetWidth');
                        shouldStuck = $window.pageYOffset > elementOffset - offset;

                        if ( shouldStuck && !sticky ) {
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
                }
            };
        }
    ]);
}
