const fs = require('fs');
const path = require('path');
const delay = require('delay');
const mailer = require('./mailer');
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
    
    for (let campaignsNumber = 0; campaignsNumber < campaigns.length; campaignsNumber++) {
      console.log(`${campaignsNumber+1}/${campaigns.length} - Sending Mail to Campaign [${campaigns[campaignsNumber].name}]`);
      const accounts = await fetchAccounts(campaigns[campaignsNumber].numberOfEmails);
      for (let accountNumber = 0; accountNumber < accounts.length; accountNumber++) {
        console.log(`${accountNumber+1}/${accounts.length} - Sending Mail to [${accounts[accountNumber]}]`);
        const mailOptions = {
          host: campaigns[campaignsNumber].server.host,
          port: campaigns[campaignsNumber].server.port,
          user: campaigns[campaignsNumber].server.userName,
          password: campaigns[campaignsNumber].server.password,
          fromName: campaigns[campaignsNumber].server.fromName,
          fromEmail: campaigns[campaignsNumber].server.fromEmail,
          replyTo: campaigns[campaignsNumber].replyTo,
          toEmail: accounts[accountNumber],
        }

        await mailer.sendMail(mailOptions);
        await delay(3000);
      }
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