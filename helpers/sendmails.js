const Campaign = require('../models/Campaign');
// @todo remove connectDb and dotenv lines
const connectDb = require('../config/db');
require('dotenv').config();

module.exports.run = () => new Promise(async (resolve, reject) => {
  try {
    await connectDb();
    const campaigns = await Campaign.find().populate('replies server');
    console.log(campaigns);
    
    for (let i = 0; i < campaigns.length; i++) {
      
    }
    
    resolve(true);
  } catch (error) {
    console.log(`Send Mails Error: ${error.stack}`);
    reject(error);
  }
});

this.run();