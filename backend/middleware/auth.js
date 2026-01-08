const jwt = require("jsonwebtoken");
const db = require("../database/db");
const { user } = db;

 const authenticateToken = async(req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  //console.log("Auth Token:", token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decodedAuth = await user.findOne({ where: {id:decoded.id } });
    if (!decodedAuth) {
      return res.status(400).json({
        message: "Access denied. This token wrong auth provided.",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateToken;