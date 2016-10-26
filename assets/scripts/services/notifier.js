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

                say ( new_message, state, duration, delay = 0 ) {
                    this.message = new_message || this.message;
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

                inform ( new_message, duration, delay ) {
                    this.say(new_message, "inform", duration, delay);
                }

                error ( new_message, duration, delay ) {
                    this.say(new_message, "error", duration, delay);
                }

                success ( new_message, duration, delay ) {
                    this.say(new_message, "success", duration, delay);
                }

                close () {
                    this.active = false;
                }
            }

            return new Notifier();

        }
    ]);
}