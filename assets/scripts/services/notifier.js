"use strict";

function notifierServicesInit ( module ) {

    module.factory('notify', [
        "$timeout",
        function ( $timeout ) {

            class Notifier {
                constructor () {
                    this.message = "";
                    this.active = false;
                    this.state = "inform";
                    this.duration = 0;
                }

                say ( state, { message, duration, delay = 0 } ) {
                    this.message = message || this.message;
                    this.state = state || "inform";
                    duration = duration || this.duration;

                    $timeout(delay)
                        .then(() => {
                            this.active = true;
                        });

                    if ( duration > 0 ) {
                        $timeout(duration + delay)
                            .then(() => {
                                this.active = false;
                            });
                    }
                }

                inform ( data ) {
                    this.say("inform", data);
                }

                error ( data ) {
                    this.say("error", data);
                }

                success ( data ) {
                    this.say("success", data);
                }

                close () {
                    this.active = false;
                }
            }

            return new Notifier();

        }
    ]);
}