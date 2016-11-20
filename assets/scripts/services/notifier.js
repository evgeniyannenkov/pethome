"use strict";

function notifierServicesInit ( module ) {

    module.service('notify', [
        "$timeout", "$sce", "$translator",
        function ( $timeout, $sce, $translator ) {

            this.messages = [];

            this.say = ( state = "inform", { message, duration = this.duration, delay = 0 } ) => {
                let last_message_index;

                last_message_index = this.messages.length;

                this.messages.push({
                    time : Date.now(),
                    message : $sce.trustAsHtml($translator.translateAllMatches(message)),
                    duration,
                    delay,
                    state
                });

                $timeout(delay)
                    .then(() => {
                        this.messages[ last_message_index ].closed = false;
                    });

                if ( duration > 0 ) {
                    $timeout(duration + delay)
                        .then(() => {
                            this.messages[ last_message_index ].closed = true;
                        });
                }
            };

            this.inform = ( data ) => {
                this.say("inform", data);
            };

            this.error = ( data ) => {
                this.say("error", data);
            };

            this.success = ( data ) => {
                this.say("success", data);
            };

            this.close = () => {
                this.active = false;
            };
        }
    ]);
}