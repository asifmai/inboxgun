module.exports.ensureAuthenticatedAdmin = (req, res, next) => {
  if (process.env.NODE_ENV == 'DEVELOPMENT') return next();
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'Please Signin First...');
    res.redirect('/login');
  }
}
