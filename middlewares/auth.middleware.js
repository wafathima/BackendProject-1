// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const JWT_SECRET = process.env.JWT_SECRET;

// exports.protect = async (req, res, next) => {
//   try {
//     const header = req.headers.authorization;
//     if (!header) return res.status(401).json({ message: "No token provided" });

//     const token = header.split(" ")[1];
//     const decoded = jwt.verify(token, JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// exports.adminOnly = (req, res, next) => {
//   if (!req.user) return res.status(401).json({ message: "Unauthorized" });
//   if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
//   next();
// };

// exports.userOnly = (req, res, next) => {
//   if (!req.user) return res.status(401).json({ message: "Unauthorized" });
//   if (req.user.role !== "user") return res.status(403).json({ message: "users Only" });
//   next();
// };


const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token" });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
