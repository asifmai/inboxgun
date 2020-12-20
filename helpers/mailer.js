const nodemailer = require('nodemailer');

module.exports.sendMail = async (options) => new Promise(async (resolve, reject) => {
  try {
    let transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      secure: false,
      auth: {
        user: options.user,
        pass: options.password,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `${options.fromName} <${options.fromEmail}>`,
      to: options.toEmail,
      replyTo: options.replyTo,
      subject: 'Test Mail From InboxGun',
      html: generateEmailBody(),
    };

    const info = await transporter.sendMail(mailOptions)
    console.log(`Mail sent: ${info.messageId}`);
    resolve(true);
  } catch (error) {
    console.log(`sendMail Error: ${error}`);
    reject(error);
  }
})

function generateEmailBody () {
  return (
    `<h1 style="text-align:center;margin-bottom:2em;">
      InboxGun
    </h1>
    <h2 style="text-align:center;margin-bottom:2em;">
      Test mail
    </h2>
    <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fuga perferendis temporibus inventore quaerat corrupti ut odit voluptatum reprehenderit nemo.
    </p>`
  )
}