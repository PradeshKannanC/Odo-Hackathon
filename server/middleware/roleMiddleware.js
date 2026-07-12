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

// Allows access if the request targets the caller's own record (req.params.id
// matches req.user._id), otherwise falls back to a role whitelist.
// Usage: router.put("/:id", protect, requireSelfOrRole("fleet_manager"), handler)
const requireSelfOrRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, no user found");
    }

    const isSelf = req.user._id.toString() === req.params.id;
    const hasRole = allowedRoles.includes(req.user.role);

    if (!isSelf && !hasRole) {
      res.status(403);
      throw new Error("Not authorized to access this resource");
    }

    next();
  };
};

module.exports = { authorize, requireSelfOrRole };
