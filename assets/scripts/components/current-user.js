"use strict";

function userComponentsInit ( module, constants ) {

    module.directive('currentUser', function () {
        return {
            scope : {
                id : "@user",
                isAdmin : "=userAdmin"
            },
            controller : function () {

            },
            controllerAs : "currentUser",
            bindToController : true
        };
    });
}
