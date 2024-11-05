const express = require("express");
const { createListing, allListings, updateListing, deleteListing } = require("../controllers/listingContro");
const router = express.Router();
const { authentication } = require("../middelware/auth");
router.route("/createlisting").post(authentication, createListing);
router.route("/alllistings").get(authentication, allListings);
router.route("/updatelisting/:id").put(authentication, updateListing);
router.route("/deletelisting/:id").delete(authentication, deleteListing);


module.exports = router;