const express = require("express");
const { createListing, allListings, updateListing, deleteListing, ListingDetails, SearchListing } = require("../controllers/listingContro");
const router = express.Router();
const { authentication } = require("../middelware/auth");
router.route("/createlisting").post(authentication, createListing);
router.route("/alllistings").get(allListings);
router.route("/updatelisting/:id").put(authentication, updateListing);
router.route("/deletelisting/:id").delete(authentication, deleteListing);
router.route("/listingdetails/:id").get(ListingDetails);
router.route("/searchlisting").get(SearchListing);


module.exports = router;