const checkAuthenticate = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: 'Unauthorized access, Please login' });
  }
};

module.exports = checkAuthenticate;
