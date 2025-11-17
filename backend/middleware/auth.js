const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
      return res.status(401).json({ 
        message: "No authorization header, access denied" 
      });
    }

    // Extract token (format: "Bearer ")
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ 
        message: "No token provided, access denied" 
      });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: "Token expired, please login again" 
        });
      }
      return res.status(401).json({ 
        message: "Invalid token" 
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ 
      message: "Server error in authentication" 
    });
  }
};

module.exports = authMiddleware;