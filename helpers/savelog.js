const Log = require('../models/Log');

module.exports = (campaignId, success, failure) = () => new Promise(async (resolve, reject) => {
  try {
    const newLog = new Log({
      campaign: campaignId,
      success, failure,
    });
    await newLog.save();

    resolve(true);
  } catch (error) {
    console.log(`saveLog Error: ${error.stack}`);
    reject(error);
  }
})
