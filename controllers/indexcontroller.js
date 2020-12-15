const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Setting = require('../models/Setting');
const Reply = require('../models/Reply');

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

module.exports.campaigns_get = (req, res, next) => {
  res.render('campaigns', {page: 'campaigns'});
}

module.exports.newcampaign_get = (req, res, next) => {
  res.render('newcampaign', {page: 'newcampaign'});
}

module.exports.settings_get = async (req, res, next) => {
  const settings = await fetchSettingsAndReplies()
  res.render('settings', {page: 'settings', ...settings, tab: 'settings'});
};

const fetchSettingsAndReplies = async () => {
  const returnVal = {};
  returnVal.settings = await Setting.find().sort({createdAt: 'desc'});
  returnVal.replies = await Reply.find().sort({createdAt: 'desc'});
  return returnVal;
}

module.exports.addsetting_post = async (req, res, next) => {
  const {service, host, port, email, password} = req.body;
  const newSetting = new Setting({
    service, host, port, email, password
  });
  await newSetting.save();
  req.flash('success_msg', 'New Setting added');
  res.redirect('/settings');
};

module.exports.deletesetting_get = async (req, res, next) => {
  const {id} = req.params;
  await Setting.findByIdAndDelete(id);
  req.flash('success_msg', 'Setting deleted');
  res.redirect('/settings');
};

module.exports.editsetting_post = async (req, res, next) => {
  console.log(req.body);
  const {id, service, host, port, email, password} = req.body;
  await Setting.findByIdAndUpdate(id, {service, host, port, email, password});
  req.flash('success_msg', 'Setting updated');
  res.redirect('/settings');
};

module.exports.addreply_post = async (req, res, next) => {
  const {name} = req.body;
  const body = req.body.body1 != '' ? req.body.body1 : req.body.body2
  const newReply = new Reply({name, body});
  await newReply.save();
  const settings = await fetchSettingsAndReplies();
  res.render('settings', {page: 'settings', ...settings, tab: 'replies', success_msg: 'Reply added'});
};

module.exports.deletereply_get = async (req, res, next) => {
  const {id} = req.params;
  await Reply.findByIdAndDelete(id);
  
  const settings = await fetchSettingsAndReplies();
  res.render('settings', {page: 'settings', ...settings, tab: 'replies', success_msg: 'Reply deleted'});
};

module.exports.editreply_post = async (req, res, next) => {
  console.log(req.body);
  const {name, id} = req.body;
  const body = req.body.body1 != '' ? req.body.body1 : req.body.body2
  await Reply.findByIdAndUpdate(id, {name, body});
  const settings = await fetchSettingsAndReplies();
  res.render('settings', {page: 'settings', ...settings, tab: 'replies', success_msg: 'Reply updated'});
};