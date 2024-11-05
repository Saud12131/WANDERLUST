const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded Payload:", decode); // Debugging line
        req.user = decode; // Ensure this includes the necessary user details (e.g., _id)
        next();
    } catch (err) {
        //console.error("JWT Verification Error:", err); // Log error details
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
};

module.exports = { authentication };
