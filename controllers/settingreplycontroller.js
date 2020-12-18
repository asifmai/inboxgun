const Setting = require('../models/Setting');
const Reply = require('../models/Reply');

module.exports.settings_get = async (req, res, next) => {
  const tab = req.query.tab ? req.query.tab : 'settings';
  const settings = await Setting.find().sort({createdAt: 'desc'});
  const replies = await Reply.find().sort({createdAt: 'desc'});

  res.render('settings', {page: 'settings', settings, replies, tab});
};

module.exports.addsetting_post = async (req, res, next) => {
  const {name, service, host, port, userName, password, fromName, fromEmail} = req.body;
  const newSetting = new Setting({
    name, service, host, port, userName, password, fromName, fromEmail,
  });
  await newSetting.save();
  req.flash('success_msg', 'New Setting added');
  res.redirect('/settings?tab=settings');
};

module.exports.deletesetting_get = async (req, res, next) => {
  const {id} = req.params;
  await Setting.findByIdAndDelete(id);
  req.flash('success_msg', 'Setting deleted');
  res.redirect('/settings?tab=settings');
};

module.exports.editsetting_post = async (req, res, next) => {
  const {id, name, service, host, port, userName, password, fromName, fromEmail} = req.body;
  await Setting.findByIdAndUpdate(id, {name, service, host, port, userName, password, fromName, fromEmail});
  req.flash('success_msg', 'Setting updated');
  res.redirect('/settings?tab=settings');
};

module.exports.addreply_post = async (req, res, next) => {
  const {name} = req.body;
  const body = req.body.body1 != '' ? req.body.body1 : req.body.body2
  const newReply = new Reply({name, body});
  await newReply.save();
  req.flash('success_msg', 'Reply Added');
  res.redirect('/settings?tab=replies');
};

module.exports.deletereply_get = async (req, res, next) => {
  const {id} = req.params;
  await Reply.findByIdAndDelete(id);
  
  req.flash('success_msg', 'Reply Deleted');
  res.redirect('/settings?tab=replies');
};

module.exports.editreply_post = async (req, res, next) => {
  console.log(req.body);
  const {name, id} = req.body;
  const body = req.body.body1 != '' ? req.body.body1 : req.body.body2
  await Reply.findByIdAndUpdate(id, {name, body});
  
  req.flash('success_msg', 'Reply Updated');
  res.redirect('/settings?tab=replies');
};