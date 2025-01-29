const express = require("express");
const router = express.Router({mergeParams:true});
const warpAsync = require("../utils/warpAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviewController.js");


//rewiews
// post route
router.post("/",isLoggedIn, validateReview ,warpAsync(reviewController.addReview));

// delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, warpAsync(reviewController.destroyReview));

module.exports = router;