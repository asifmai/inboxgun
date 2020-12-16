const Setting = require('../models/Setting');
const Reply = require('../models/Reply');
const Campaign = require('../models/Campaign');

module.exports.campaigns_get = async (req, res, next) => {
  const campaigns = await Campaign.find().sort({name: 'asc'});
  res.render('campaigns', {page: 'campaigns', campaigns});
}

module.exports.newcampaign_get = async (req, res, next) => {
  const replies = await Reply.find().sort({name: 'asc'});
  const settings = await Setting.find().sort({host: 'asc'});
  res.render('newcampaign', {page: 'newcampaign', replies, settings});
}

module.exports.newcampaign_post = async (req, res, next) => {
  const {name, numberOfEmails, replyTo, server} = req.body;
  const replies = req.body.replies ? (typeof req.body.replies == 'object' ? req.body.replies : [req.body.replies]) : [];
  // console.log(name, numberOfEmails, replyTo, server, replies);

  const newCampaign = new Campaign({
    name, numberOfEmails, replyTo, server, replies
  });
  await newCampaign.save();

  req.flash('success_msg', 'Campaign Added');
  res.redirect('/campaigns');
}