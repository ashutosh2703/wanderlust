const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController=require("../controllers/listingController.js")
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });

//Index Route
router.route("/")
.get( warpAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'),validateListing, warpAsync(listingController.createListing));

//New Route
router.get("/new", isLoggedIn,listingController.renderNewForm );

//Show Route
router.get("/:id", warpAsync(listingController.showListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, warpAsync(listingController.renderEditForm));

//Update Route
router.put("/:id", isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, warpAsync(listingController.updateListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, warpAsync(listingController.destroyListing));

module.exports = router;
