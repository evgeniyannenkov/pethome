"use_strict";

function advertiserServicesInit ( module ) {
    module.factory('advertiser', [
        "$http", ( $http ) => {

            const test = function (  ) {
                console.log(12345);
            };

            return {
                test
            }
        }
    ]);
}