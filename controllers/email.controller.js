const nodemailer = require('nodemailer');

//tusclases50@gmail.com
//fwyiqeumjofyvopu

exports.sendEmail = async function (req, res,) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "tusclases50@gmail.com", // generated ethereal user
          pass: "fwyiqeumjofyvopu", // generated ethereal password
        },
      });

    try {
        const info = await transporter.sendMail({
            from: "tusclases50@gmail.com", // sender address
            to: req.body.destinatario,
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        return res.status(200).json({status: 200, data: info, message: "Email sent successfully"})
    } catch (error) {
        return res.status(400).json({status: 400, message: e.message})
    }
};