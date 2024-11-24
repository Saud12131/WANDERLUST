import express from "express";
import {
    createListing,
    allListings,
    updateListing,
    deleteListing,
    ListingDetails,
    SearchListing,
    UserDetails
  } from "../controllers/listingContro.js"; // Add .js for ES modules
  import { authentication } from "../middelware/auth.js"; // Add .js for ES modules
  import validate from "../middelware/validate.js"; // Add .js for ES modules
  import { ListingValidation } from "../validation/Validations.js"; // Add .js for ES modules
  
  const router = express.Router();
  
//routes
router.route("/createlisting").post(authentication,validate(ListingValidation), createListing);
router.route("/alllistings").get(allListings);
router.route("/updatelisting/:id").put(authentication, updateListing);
router.route("/deletelisting/:id").delete(authentication, deleteListing);
router.route("/listingdetails/:id").get(ListingDetails);
router.route("/searchlisting").get(SearchListing);
router.route("/userdetails").get(authentication, UserDetails);


export default router;