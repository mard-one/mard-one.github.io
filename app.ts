import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

import * as config from './config/db';

const app = express();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass
  }
});

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/dist'));
const router = express.Router();

app.post('/getintouch', (req, res) => {
  const mailOptions = {
    from: 'mardon.mashrabov2@gmail.com',
    to: 'mardon.mashrabov@gmail.com',
    subject: req.body.subject,
    html: ` <h1> Message form Mardon.com </h1>
    <br>
    Sender's name: ${req.body.username} <br>
    Sender's email: ${req.body.email} <br>
    Subject is about: ${req.body.subject} <br>
    Message: ${req.body.message}<br>
    <br>
    He/She found about Mardon.com from: ${req.body.source}
    `
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      res.send({
        success: false,
        message: 'Something went wrong. Try again later'
      });
    } else {
      res.send({
        success: true,
        message: 'Your email has successfully sent. I will contact you ASAP. Thank you!'
      });
    }
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/dist/index.html'));
});

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
