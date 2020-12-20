const Campaign = require('../models/Campaign');
const connectDb = require('../config/db');

module.exports.run = () => new Promise(async (resolve, reject) => {
  try {
    await db();
    const campaigns = await Campaign.find();
    console.log(campaigns);
    
    resolve(true);
  } catch (error) {
    console.log(`Send Mails Error: ${error.stack}`);
    reject(error);
  }
});

this.run();