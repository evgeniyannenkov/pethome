"use strict";

function formControllersInit ( module ) {

    module.controller("formCtrl", [
        "$scope", "validate", "notify", "$timeout",
        function ( $scope, validate, notify, $timeout ) {

            this.$form = {};

            this.fields = {};

            $scope.$on("popup_open", ( event, data ) => {
                if ( data ) {
                    this.$form = $scope[this.name];
                }
            });

            this.cancel = () => {
                if ( this.popup ) {
                    this.popup.close();
                }
            };

            this.submit = () => {

                angular.forEach(this.fields, ( value, key ) => {
                    this.$form[key].$setTouched();
                });

                if ( this.$form && this.$form.$valid ) {

                    this.submitFunction({fields : this.fields, name : this.name});

                } else {
                    notify.error({
                        message : `${this.name} form invalid`,
                        duration : 2000
                    });
                }
            };

        }
    ]);

    module.controller("formFieldCtrl", [
        "$scope", "validate", "notify",
        function ( $scope, validate, notify ) {

            this.regex = {
                email : validate.email(),
                password : validate.password(),
            };

            this.reset = () => {
                this.form.validClass = '';
                this.form.responseClass = '';
            };

            this.check = () => {

                if ( this.form.$form[this.type] ) {
                    this.form.error = !this.form.$form[this.type].$valid;
                }

                if(this.form && this.form.fields) {
                    this.form.fields[this.type] = this[this.type];
                }

            }

        }
    ]);
}