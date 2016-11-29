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
}