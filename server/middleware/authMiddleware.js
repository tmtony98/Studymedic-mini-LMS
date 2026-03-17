const protect = (req, res, next) => {
  // TODO: Implement authentication (e.g., JWT verification)
  next();
};

module.exports = { protect };
