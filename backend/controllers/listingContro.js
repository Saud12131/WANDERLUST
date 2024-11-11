const Listing = require("../models/listingmodel");

const createListing = async (req, res) => {
    //console.log("recived body", req.body);

    const { title, description, image, price, country, location } = req.body;


    if (!title || !description || !price || !country || !location || !image) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    try {
        const newListing = await Listing.create({
            owner: req.user.id,
            title,
            description,
            image,
            country,
            location,
            price
        });

        res.status(201).json({
            success: true,
            message: "Listing added successfully",
            listing: newListing,
        });


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Failed to add listing: ${err.message}`
        });
    }
};
const allListings = async (req, res) => {

    try {
        const listing = await Listing.find().populate('owner', 'title email');
        return res.status(201).json({
            success: true,
            listing,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err,
        });

    }

}

const updateListing = async (req, res) => {
    const { title, description, image, price, country, location } = req.body;

    if (!title || !description || !price || !country || !location) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            { title, description, price, image, country, location },
            { new: true, runValidators: true },
        );

        if (!updatedListing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Listing updated successfully",
            listing: updatedListing.toObject({ getters: true, versionKey: false }) // Convert to plain object to avoid circular references
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Failed to update listing: ${err.message}`
        });
    }
};

const ListingDetails = async (req, res) => {

    const { id } = req.params;
    if (!id) {
        res.status(404).json({
            success: false,
            message: " id not recived params "
        });
    }
    const listingdetails = await Listing.findById(id).populate('owner', 'username ');

    if (!listingdetails) {
        res.status(404).json({
            success: false,
            message: " listing not recived  "
        });
    }
    try {
        res.json({ success: true, listingdetails });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: " some thing error occured "
        });
    }
}

const deleteListing = async (req, res) => {
    const ListingId = req.params.id
    const UserId = req.user.id;
    try {
        const listing = await Listing.findById(ListingId);

        if (!listing) {
            res.status(404).json({
                success: false,
                message: "listing not available"
            });
        }
        if (listing.owner.toString() !== UserId) {
            res.status(403).json({
                success: false,
                message: "unable to delete you are not authorized"
            });
        }
        await Listing.findByIdAndDelete(ListingId);
        res.status(200).json({
            success: true,
            message: "listing deleted successfully",
        });
    } catch (err) {
        res.status(500).status({
            success: false,
            message: err,
        });
        console.log(err);
    }

}
const SearchListing = async (req, res) => {
    const { title } = req.query;
    
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title not received from params",
        });
    }

    try {
      
        const listings = await Listing.find({
            title: { $regex: title, $options: 'i' },
        }).populate('owner', 'username email');  


        if (listings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No listings found",
            });
        }

        return res.status(200).json({
            success: true,
            listings,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Error occurred: ${err.message}`,
        });
    }
};

module.exports = {
    createListing,
    updateListing,
    deleteListing,
    allListings,
    ListingDetails,
    SearchListing,
};
