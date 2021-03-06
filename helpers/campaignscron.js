const schedule = require('node-schedule');
const sendMails = require('./sendmails');

module.exports = (options = {seconds: 0, minutes: 0, hours: 0, day: '*'}) => {
  // Setup Cron job at Given Time
  const job = schedule.scheduleJob(`${options.seconds} ${options.minutes} ${options.hours} ${options.day} * *`,
      (fireDate) => {
        sendMails.send();
      });
  console.log(`Cron job configured at ${options.hours}:${options.minutes}:${options.seconds} on Day ${options.day}...`);
};
