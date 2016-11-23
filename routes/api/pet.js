"use strict";

const express = require('express');
const Pet = require('../../schemas/pet');
const router = express.Router();
const response = require("../../middleware/response");
const uploader = require("../../config/uploader");
const pets = require("../../controllers/pet");


router.get("/", ( req, res, next ) => {
    Pet.find({})
       .then(( pets ) => {
           res.json({
               pets,
               success : true
           });
       })
       .catch(( error ) => {
           res.json({
               success : false,
               message : error.message
           });
       });
});

router.get("/:id", ( req, res, next ) => {
    const _id = req.params.id;
    Pet.findById(_id)
       .then(( pet ) => {
           res.json({ pet, success : true });
       })
       .catch(( error ) => {
           res.json({
               success : false,
               message : error.message
           });
       });
});

router.put("/:id", response.ifLoggedOut(), ( req, res, next ) => {
    const _id = req.params.id;
    const newPet = req.body || {};

    let image;

    if ( newPet._id && newPet._id == _id && (req.user._id == newPet.author || req.user.is_admin) ) {

        Pet.findOne({ _id, author : newPet.author })
           .then(( pet ) => {
               if ( pet ) {
                   for ( let i = 0; i < pet.images.length; i++ ) {
                       image = pet.images[ i ];
                       if ( newPet.images.indexOf(image) === -1 ) {
                           uploader.deleteFile(image)
                                   .then(( response ) => {
                                       console.log(response.data.success);
                                   })
                                   .catch(( error ) => {
                                       console.log(err);
                                   });
                           newPet.mainImage = newPet.mainImage == image ? "" : newPet.mainImage;

                           newPet.mainImage = i == pet.images.length - 1 ? newPet.images[ 0 ] || "" : newPet.mainImage;

                       } else if ( !newPet.mainImage ) {
                           newPet.mainImage = image;
                       }
                   }
                   newPet.reviewed = false;
                   Pet.findOneAndUpdate({ _id }, newPet, { new : true })
                      .then(( newPet ) => {
                          res.json({ newPet, success : true, message : "Update Pet: saved" });
                      })
                      .catch(( err ) => {
                          res.json({
                              message : "Update Pet: not saved",
                              error_message : err.message,
                              success : false
                          });
                      });
               } else {
                   res.json({
                       message : "Update Pet: not found",
                       success : false
                   });
               }
           })
           .catch(( error ) => {
               res.json({
                   success : false,
                   message : error.message
               });
           });
    } else {
        res.json({
            message : "Update Pet: id isn't correct",
            success : false
        });
    }
});

router.put("/:id/review", response.ifNotAdmin(), ( req, res, next ) => {
    const _id = req.params.id;

    Pet.findByIdAndUpdate(_id, { reviewed : true }, { new : true })
       .then(( pet ) => {
           if ( pet ) {
               res.json({ pet, success : true, message : "[[Reviewed]]." });
           } else {
               res.json({
                   message : "Review Pet: not found",
                   success : false
               });
           }
       })
       .catch(( error ) => {
           res.json({
               success : false,
               message : error.message
           });
       });
});

router.post('/', response.ifLoggedOut(), ( req, res, next ) => {

    if ( !req.user.blocked ) {

        pets.create({ userId : req.user._id, data : req.body })
            .then(( response ) => {
                res.json(response);
            })
            .catch(( error ) => {
                res.json({ success : false, message : error.message });
            });

    } else {
        res.json({
            success : false,
            message : "This account is blocked, you can't create new pet."
        });
    }

});

router.get("/:id/delete", response.ifLoggedOut(), ( req, res, next ) => {
    const _id = req.params.id;

    let image;
    let searchData = { _id };

    if ( !req.user.is_admin ) {
        searchData.author = req.user._id;
    }

    Pet.findOneAndRemove(searchData)
       .then(( pet ) => {
           if ( pet ) {
               for ( let i = 0; i < pet.images.length; i++ ) {
                   image = pet.images[ i ];
                   uploader.deleteFile(image)
                           .then(( response ) => {
                               console.log(response.data.success);
                           })
                           .catch(( error ) => {
                               console.log(err);
                           });
               }
               res.json({ success : true, pet, redirect : "/profile" });
           } else {
               res.json({ success : false, message : "No pet was removed." });
           }
       })
       .catch(( error ) => {
           res.json({
               success : false,
               message : error.message
           });
       });
});

router.post("/:id/images", response.ifLoggedOut(), uploader.imagesUpload.single('images'), ( req, res, next ) => {
    const _id = req.params.id;
    const uploads = "uploads/";
    const src = uploads + req.file.filename;

    Pet.findOne({ _id })
       .then(( pet ) => {
           if ( pet ) {
               pet.images.push(src);
               if ( !pet.mainImage ) {
                   pet.mainImage = src;
               }
               pet.save()
                  .then(( newPet ) => {
                      res.json({ newPet, success : true });
                  })
                  .catch(( err ) => {
                      res.json({
                          message : "Save Pet: not saved",
                          error_message : err.message,
                          success : false
                      });
                  });

           } else {
               res.json({
                   message : "Find Pet: not found",
                   success : false
               });
           }
       })
       .catch(( error ) => {
           res.json({
               success : false,
               message : error.message
           });
       });

});

module.exports = router;