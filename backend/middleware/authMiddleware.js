import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided. Please login."
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "jwt_secret_key"
        );

        // Attach user info to request
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again."
            });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }
        res.status(500).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
};
