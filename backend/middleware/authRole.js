const isAdmin = (req, res, next) => {
  if (req.user?.role !== "Admin") {
    return res.status(403).json({ status: false, message: "Access denied. Admin only." });
  }
  next();
};

const isProvider = (req, res, next) => {
  if (req.user?.role !== "Provider") {
    return res.status(403).json({ status: false, message: "Access denied. Provider only." });
  }
  next();
};

const isUser = (req, res, next) => {
  if (req.user?.role !== "User") {
    return res.status(403).json({ status: false, message: "Access denied. User only." });
  }
  next();
};

module.exports = {
  isAdmin,
  isProvider,
  isUser,
};
