const fs = require('fs');
const path = require('path');
const Campaign = require('../models/Campaign');

// @todo remove below lines
const Reply = require('../models/Reply');
const Setting = require('../models/Setting');
const connectDb = require('../config/db');
require('dotenv').config();

module.exports.run = () => new Promise(async (resolve, reject) => {
  try {
    await connectDb();
    const campaigns = await Campaign.find().populate('replies server');
    console.log(campaigns);
    
    for (let i = 0; i < campaigns.length; i++) {
      const accounts = await fetchAccounts(campaigns[i].numberOfEmails);
      console.log(accounts);
    }
    
    resolve(true);
  } catch (error) {
    console.log(`Send Mails Error: ${error.stack}`);
    reject(error);
  }
});

const fetchAccounts = (numberOfAccounts) => new Promise(async (resolve, reject) => {
  try {
    const accountsPath = path.resolve(__dirname, '../config/accounts.json');
    const allAccounts = JSON.parse(fs.readFileSync(accountsPath));
    const accounts = [];

    for (let i = 0; i < numberOfAccounts; i++) {
      const rndIdx = Math.floor(Math.random() * numberOfAccounts);
      accounts.push(allAccounts[rndIdx].email);
    }

    resolve(accounts);
  } catch (error) {
    console.log(`fetchAccounts Error: ${error.stack}`);
    reject(error);
  }
});

this.run();