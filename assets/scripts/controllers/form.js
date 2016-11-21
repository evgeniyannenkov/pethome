"use strict";

function formControllersInit ( module ) {

    module.controller("formCtrl", [
        "$scope", "$rootScope", "validate", "notify",
        function ( $scope, $rootScope, validate, notify ) {

            this.$form = {};

            this.fields = {};


            $rootScope.$on("popup_open", ( event, data, type ) => {
                if ( type ) {
                    this.$form = $scope[ this.name ];
                }
            });

            this.cancel = () => {
                if ( this.popup ) {
                    this.popup.close();
                }
                this.validClass = "";
            };

            this.check = () => {

                if ( this.$form ) {
                    this.validClass = this.$form.$valid ? "valid" : "error";
                }

            };

            this.submit = () => {

                angular.forEach(this.fields, ( value, key ) => {
                    this.$form[ key ].$setTouched();
                });

                if ( this.$form && this.$form.$valid ) {

                    this.submitFunction({ name : this.name, data : this.data });

                    $scope.$on("formResponse", ( event, data ) => {
                        this.responseClass = data.responseClass;
                        if ( data.reset ) {
                            this.validClass = "";
                            this.cancel();
                        }
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
                text : validate.text(),
                textarea : validate.textarea(),
                tel : validate.tel()
            };

            this.reset = () => {
                this.form.validClass = '';
                this.form.responseClass = '';
            };

            this.check = () => {
                if ( this.form && this.form.fields ) {
                    this.form.fields[ this.name ] = this[ this.name ];
                }
            }

        }
    ]);
}