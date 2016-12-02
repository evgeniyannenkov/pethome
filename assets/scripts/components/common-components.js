"use strict";

function commonComponentsInit ( module, common ) {

    module.directive('selectOnClick', [
        '$window',
        function ( $window ) {
            return ( $scope, $element ) => {
                $element.on('click', function () {
                    if ( !$window.getSelection().toString() ) {
                        this.setSelectionRange(0, this.value.length)
                    }
                });
            };
        }
    ]);

    module.directive('popupOverflow', function () {
            return {
                controller : [
                    "$scope",
                    function ( $scope ) {

                        $scope.$on("popup_open", ( event, data ) => {
                            $scope.overflow = true;
                        });

                        $scope.$on("popup_close", ( event, data ) => {
                            $scope.overflow = false;
                        });
                    }
                ]
            }
        }
    );
}