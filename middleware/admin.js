module.exports = function (req, res, next) {
  // 401 Unauthorized : try
  // 403 Forbidden : dont try again

  if (!req.user.isAdmin)
    return res.status(403).json({ msgsrv: "Access denied." });

  next();
};
