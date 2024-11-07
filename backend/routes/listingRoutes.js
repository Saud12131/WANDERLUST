const express = require("express");
const { createListing, allListings, updateListing, deleteListing, ListingDetails } = require("../controllers/listingContro");
const router = express.Router();
const { authentication } = require("../middelware/auth");
router.route("/createlisting").post(authentication, createListing);
router.route("/alllistings").get(authentication, allListings);
router.route("/updatelisting/:id").put(authentication, updateListing);
router.route("/deletelisting/:id").delete(authentication, deleteListing);
router.route("/listingdetails/:id").get(authentication, ListingDetails);


module.exports = router;