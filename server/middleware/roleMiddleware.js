// Restricts access to users whose role is included in allowedRoles
// Usage: router.get("/admin-only", protect, authorize("admin"), handler)
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Not authorized to access this resource");
    }
    next();
  };
};

module.exports = { authorize };
