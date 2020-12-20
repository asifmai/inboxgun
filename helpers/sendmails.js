const fs = require('fs');
const path = require('path');
const delay = require('delay');
const mailer = require('./mailer');
const Campaign = require('../models/Campaign');
const saveLog = require('./savelog');
let campaigns = [];

// @todo remove below lines
const Reply = require('../models/Reply');
const Setting = require('../models/Setting');
const connectDb = require('../config/db');
require('dotenv').config();

module.exports.send = () => new Promise(async (resolve, reject) => {
  try {
    await connectDb();
    campaigns = await Campaign.find().populate('replies server');
    
    for (let campaignNumber = 0; campaignNumber < campaigns.length; campaignNumber++) {
      await sendMailsForCampaign(campaignNumber);
    }
    
    resolve(true);
  } catch (error) {
    console.log(`Send Mails Error: ${error.stack}`);
    reject(error);
  }
});

const sendMailsForCampaign = (campaignNumber) => new Promise(async (resolve, reject) => {
  try {
    let mailSuccess = 0;
    let mailFailure = 0;
    console.log(`${campaignNumber+1}/${campaigns.length} - Sending Mails for Campaign [${campaigns[campaignNumber].name}] from Server [${campaigns[campaignNumber].server.name}], Number of Emails [${campaigns[campaignNumber].numberOfEmails}]`);
    const accounts = await fetchAccounts(campaigns[campaignNumber].numberOfEmails);
    for (let accountNumber = 0; accountNumber < accounts.length; accountNumber++) {
      console.log(`${accountNumber+1}/${accounts.length} - Sending Mail to [${accounts[accountNumber]}]`);
      const mailOptions = {
        host: campaigns[campaignNumber].server.host,
        port: campaigns[campaignNumber].server.port,
        user: campaigns[campaignNumber].server.userName,
        password: campaigns[campaignNumber].server.password,
        fromName: campaigns[campaignNumber].server.fromName,
        fromEmail: campaigns[campaignNumber].server.fromEmail,
        replyTo: campaigns[campaignNumber].replyTo,
        toEmail: accounts[accountNumber],
      }

      try {
        await mailer.sendMail(mailOptions);
        mailSuccess++;
      } catch (error) {
        mailFailure++;
      }
      await delay(3000);
    }
    console.log(`${campaignNumber+1}/${campaigns.length} - SENT Mails for Campaign [${campaigns[campaignNumber].name}] from Server [${campaigns[campaignNumber].server.name}], Number of Emails [${campaigns[campaignNumber].numberOfEmails}], Success [${mailSuccess}], Fail [${mailFailure}]`);
    await saveLog(campaigns[campaignNumber]._id, mailSuccess, mailFailure);

    resolve(true);
  } catch (error) {
    console.log(`sendMailsForCampaign[${campaigns[campaignNumber].name}] Error: ${error.stack}`);
    reject(error);
  }
})


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

this.send();