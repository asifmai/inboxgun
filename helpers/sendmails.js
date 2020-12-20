const Campaign = require('../models/Campaign');

module.exports.run = () => new Promise(async (resolve, reject) => {
  try {
    const campaigns = await Campaign.find();
    console.log(campaigns);
    
    resolve(true);
  } catch (error) {
    console.log(`Send Mails Error: ${error.stack}`);
    reject(error);
  }
});

this.run();