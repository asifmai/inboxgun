const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.index_get = (req, res, next) => {
  res.render('index', {page: 'dashboard'});
}

module.exports.login_get = (req, res, next) => {
  res.render('login');
}

module.exports.login_post = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Email or Password Incorrect...',
  })(req, res, next);
}

module.exports.logout_get = (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are Logged out!');
  res.redirect('/login');
}

module.exports.signup_get = (req, res, next) => {
  res.render('signup');
}

module.exports.signup_post = async (req, res, next) => {
  const {firstName, lastName, email, password} = req.body;
  const foundUser = await User.findOne({email});
  if (foundUser) {
    return res.render('signup', {
      firstName, lastName, email, password, error_msg: 'Email already registered'
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      firstName, lastName, email, password: passwordHash
    });
    await newUser.save();
    req.flash('success_msg', 'Registerd! please login');
    res.redirect('/login');
  }
}
