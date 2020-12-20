const fs = require('fs');
const path = require('path');
const Campaign = require('../models/Campaign');
let accounts = [];
// @todo remove connectDb and dotenv lines
const connectDb = require('../config/db');
require('dotenv').config();

module.exports.run = () => new Promise(async (resolve, reject) => {
  try {
    const accountsPath = path.resolve(__dirname, '../config/accounts.json');
    accounts = JSON.parse(fs.readFileSync(accountsPath));
    await connectDb();
    const campaigns = await Campaign.find().populate('replies server');
    console.log(campaigns);
    console.log(accounts.length);
    
    for (let i = 0; i < campaigns.length; i++) {
      
    }
    
    resolve(true);
  } catch (error) {
    console.log(`Send Mails Error: ${error.stack}`);
    reject(error);
  }
});

this.run();