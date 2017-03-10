'use strict';

var _ = require('lodash');
var nodemailer = require('nodemailer');

// Get list of mails


var transport = nodemailer.createTransport("SMTP", {
  host: "smtp.gmail.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP 587
  auth: {
    user: "nix@suppliesdc.com",
    pass: "Supp1145"
    /*user: "juang@suppliesdc.com",
    pass: "A*96nixz"*/
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

exports.send = function(req, res) {

  var b = req.body;
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'Supplies de Colombia ✔ NIX <nix@suppliesdc.com>', // sender address
    to: b.to, // list of receivers
    subject: b.subject, // Subject line
    text: '✔', // plaintext body
    html: b.body // html body
  };

  // send mail with defined transport object
  transport.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.dir(error);
      res.send('nop');
    } else {
      console.dir('Message sent: ' + info.response);
      res.send('ok');
    }

  });

}
