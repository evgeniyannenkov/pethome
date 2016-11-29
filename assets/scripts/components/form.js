"use strict";

function formComponentsInit ( module, common ) {

    module.component("popupForm", {
            templateUrl : common.getTemplatePath("popup-form"),
            require : {
                popup : "^^?popupContent"
            },
            bindings : {
                name : "@",
                label : "@",
                submitFunction : "&"
            },
            transclude : true,
            controller : "formCtrl",
            controllerAs : "form",
        }
    );

    module.component("formInput", {
        templateUrl : common.getTemplatePath("form-parts/form-input"),
        require : {
            form : "^^?popupForm"
        },
        bindings : {
            type : "@",
            name : "@",
            required : "@",
            value : "=",
            min : "@",
            max : "@"
        },
        controller : "formFieldCtrl",
        controllerAs : "field"
    });

    module.component("formTextarea", {
        templateUrl : common.getTemplatePath("form-parts/form-textarea"),
        require : {
            form : "^^?popupForm"
        },
        bindings : {
            type : "@",
            name : "@",
            required : "@",
            value : "="
        },
        controller : "formFieldCtrl",
        controllerAs : "field"
    });

    module.component("resetForm", {
        templateUrl : common.getTemplatePath("reset"),
        bindings : {
            emailHash : "@",
            hash : "@"
        },
        controllerAs : "reset",
        controller : [
            "$scope", "$timeout", "notify", "author",
            function ( $scope, $timeout, notify, author ) {
                this.submit = () => {

                    if ( this.password == this.passwordConfirm ) {
                        author.resetPassword({
                            emailHash : this.emailHash,
                            hash : this.hash,
                            data : { newPassword : this.password }
                        }).then(( response ) => {
                            if ( response.data.success ) {
                                notify.inform({
                                    message : `[[Success]]`,
                                    duration : 1500
                                });
                                $timeout(1000)
                                    .then(() => {
                                        $scope.$broadcast("formResponse", {
                                            responseClass : "success"
                                        });
                                        document.location.href = "/";
                                    });
                            } else {
                                notify.error({
                                    message : `[[${response.data.message}]]`,
                                    duration : 1500
                                });
                                $timeout(500)
                                    .then(() => {
                                        $scope.$broadcast("formResponse", {
                                            responseClass : "fail"
                                        });
                                    });
                            }
                        }).catch(( error ) => {
                            notify.error({
                                message : `[[${error.data.message || "wrong token"}]]`,
                                duration : 1500
                            });
                            $timeout(500)
                                .then(() => {
                                    $scope.$broadcast("formResponse", {
                                        responseClass : "fail"
                                    });
                                });
                        });
                    } else {
                        notify.error({
                            message : `[[Do not match]]`,
                            duration : 1500
                        });
                        $timeout(500)
                            .then(() => {
                                $scope.$broadcast("formResponse", {
                                    responseClass : "fail"
                                });
                            });
                    }
                };
            }

        ]
    });
}