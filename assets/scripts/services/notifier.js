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

                say ( new_message, state, duration ) {
                    this.active = true;
                    this.message = new_message || this.message;
                    this.state = state || "inform";
                    duration = duration || this.duration;

                    if ( duration > 0 ) {
                        $timeout(() => {
                            this.active = false;
                        }, duration);
                    }
                }

                inform ( new_message, duration ) {
                    this.say(new_message, "inform", duration);
                }

                error ( new_message, duration ) {
                    this.say(new_message, "error", duration);
                }

                success ( new_message, duration ) {
                    this.say(new_message, "success", duration);
                }

                close () {
                    this.active = false;
                }
            }

            return new Notifier();

        }
    ]);
}