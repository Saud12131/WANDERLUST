const jwt = require('jsonwebtoken');
const authentication = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({
        success: false,
        message: "no token provided"
    });
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) return res.status(401).json({ success: false, message: "unauthorized" });
        req.user = decode.id;
        next();
    })
}
module.exports = { authentication };