"use strict";

function validationServicesInit ( module ) {
    module.factory('validate', [
        function () {
            const email = function (  ) {
                return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
            };

            const password = function (  ) {
                return /.*\S.*/;
            };


            return {
                email,
                password
            }

        }
    ])
}