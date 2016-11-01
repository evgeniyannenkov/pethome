"use strict";

function authorControllersInit ( module ) {

    module.controller('authorCtrl', [
        "author",
        function ( author ) {
            author.get({id : this.id})
                  .then(( response ) => {
                      if ( response.data.success ) {
                          this.fields = response.data.author;
                      }
                  })
                  .catch(( response ) => {
                      console.log(response);
                  });
        }
    ]);
    module.controller('authorEditCtrl', [
        "author", "notify",
        function ( author, notify ) {

            this.temporary_data = JSON.parse(JSON.stringify(this.author));

            this.cancel = () => {
                this.temporary_data = JSON.parse(JSON.stringify(this.author));
                if ( this.popup ) {
                    this.popup.close();
                }
            };

            this.edit = () => {
                author.update({id : this.author._id, data : this.temporary_data})
                      .then(( response )=> {
                          if ( response.data.success ) {
                              notify.inform({
                                  message : `Updated  <i class="fa fa-check" aria-hidden="true"></i>`,
                                  duration : 1500
                              });
                              this.author = JSON.parse(JSON.stringify(this.temporary_data));
                              if ( this.popup ) {
                                  this.popup.close();
                              }
                          }
                      })
                      .catch(( error )=> {
                          console.log(error);
                      });
            };
        }
    ]);

    module.controller('authorRemoveCtrl', [
        "author", "notify",
        function ( author, notify ) {
            this.remove = () => {
                author.remove({id : this.author._id})
                      .then(( response ) => {
                          if ( response.data.success ) {
                              notify.inform({
                                  message : `Removed  <i class="fa fa-check" aria-hidden="true"></i>`,
                                  duration : 1000
                              });
                              setTimeout(()=> {
                                  document.location.href = "/";
                              }, 1200);
                          }
                      })
                      .catch(( err ) => {
                          console.log(err);
                      });
            };

            this.cancel = () => {
                if ( this.popup ) {
                    this.popup.close();
                }
            };

        }
    ]);
}
