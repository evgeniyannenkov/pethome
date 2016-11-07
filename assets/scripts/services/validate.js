"use strict";

function validationServicesInit ( module ) {
    module.factory('validate', [
        function () {
            const email = () => {
                return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
            };

            const password = () => {
                return /.*\S.*/;
            };

            const text = () => {
                return /^[^\"\'\*/\\\\<>]*$/;
            };

            const textarea = () => {
                return /^[^\*/\\\\<>]*$/;
            };

            const tel = () => {
                return /\+?1?\s*\(?-*\.*(\d{3})\)?\.*-*\s*(\d{3})\.*-*\s*(\d{4})$/;
            };

            return {
                email,
                password,
                text,
                textarea,
                tel
            }

        }
    ])
}