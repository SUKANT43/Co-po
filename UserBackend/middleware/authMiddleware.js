const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store decoded JWT data in the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = authMiddleware;
