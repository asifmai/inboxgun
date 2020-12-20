const Log = require('../models/Log');

module.exports.logs_get = async (req, res) => {
  const logs = await Log.find().populate('campaign').sort({createdAt: 'desc'});
  res.render('logs', {page: 'logs', logs});
}