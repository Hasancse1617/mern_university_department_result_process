const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

module.exports.Send_Reset_Password_Email = async(email, type) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_GMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const emailToken = jwt.sign({email}, process.env.EMAIL_SECRET, {
        expiresIn: '10m'
       });
      const url = `http://localhost:3000/${type}/reset-password/${emailToken}`;
      let info = await transporter.sendMail({
        from: `"Result Processing" ${process.env.SMTP_GMAIL}`, // sender address
        to: email, // list of receivers
        subject: "Chairman Reset Password ✔", // Subject line
        text: "Please check your email to reset your password", // plain text body
        html: `<h4><a href="${url}">${emailToken}</a></h4><br><b>Please check your email to reset your password click <a href="${url}">here!!!</a></b>`, // html body
      });
}

module.exports.send_Account_Verify_Email = async(email, type) =>{
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_GMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const emailToken = jwt.sign({email}, process.env.EMAIL_SECRET, {
      expiresIn: '10m'
    });
    const url = `http://localhost:3000/${type}/verify-account/${emailToken}`;
    let info = await transporter.sendMail({
      from: `"Result Processing" ${process.env.SMTP_GMAIL}`, // sender address
      to: email, // list of receivers
      subject: "Chairman Account Activation ✔", // Subject line
      text: "Thanks for creating your account. Please verify your account", // plain text body
      html: `<h4><a href="${url}">${emailToken}</a></h4><br><b>To verify your account Please click <a href="${url}">here!!!</a></b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
}