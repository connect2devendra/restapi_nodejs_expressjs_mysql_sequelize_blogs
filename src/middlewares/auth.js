const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const accessTokenSecret = process.env.JWT_SECRET_KEY;

        jwt.verify(token, accessTokenSecret, (err, decodeUserInfo) => {
            if (err) {
                return res.status(403).json({
                    success:false,
                    message: "Invalid token or expired!",
                    error: err
                });
            }
            req.user = decodeUserInfo.data;
            next();
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Bearer token is required."
        });
    }
};

module.exports = {authenticateJWT}; 