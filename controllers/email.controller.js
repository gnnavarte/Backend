const nodemailer = require('nodemailer');

//tusclases50@gmail.com
//fwyiqeumjofyvopu

exports.sendEmail = async function (req, res,) {
    console.log('El mail llega al baken')

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "tusclases50@gmail.com", // generated ethereal user
          pass: "fwyiqeumjofyvopu", // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
      });

    try {
        const info = await transporter.sendMail({
            from: "tusclases50@gmail.com", // sender address
            to: req.body.destinatario,
            subject: "Comentario bloqueado", // Subject line
            text: req.body.motivo // plain text body
        });
        return res.status(200).json({status: 200, data: info, message: "Email sent successfully"})
    } catch (error) {
        return res.status(400).json({status: 400, message: error.message})
    }
};