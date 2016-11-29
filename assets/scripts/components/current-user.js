"use strict";

function userComponentsInit ( module, common ) {

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
