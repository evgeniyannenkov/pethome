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
                    console.log(this.$form);
                }
            });

            this.cancel = () => {
                if ( this.popup ) {
                    this.popup.close();
                }
            };

            this.check = () => {
                if ( this.$form ) {
                    this.validClass = this.$form.$valid ? "valid" : "error";
                }
            };

            this.submit = () => {

                angular.forEach(this.fields, ( value, key ) => {
                    this.$form[key].$setTouched();
                });

                if ( this.$form && this.$form.$valid ) {

                    this.submitFunction({name : this.name});

                    $scope.$on("formResponse", ( event, data ) => {
                        this.responseClass = data.responseClass;
                        console.log(data.responseClass);
                    })

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
        "$scope", "validate",
        function ( $scope, validate ) {

            this.regex = {
                email : validate.email(),
                password : validate.password(),
                text: ""
            };

            this.reset = () => {
                this.form.validClass = '';
                this.form.responseClass = '';
            };

            this.check = () => {
                if ( this.form && this.form.fields ) {
                    this.form.fields[this.name] = this[this.name];
                }
            }

        }
    ]);
}