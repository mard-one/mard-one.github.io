"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
// var mongoose = require("mongoose");
var nodemailer = require("nodemailer");
var path = require("path");
var config = require("./src/config/db");
var app = express();
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.user,
        pass: config.pass
    }
});
// mongoose.connect(config.database, function (err) {
//     if (err) {
//         console.log('Could NOT connect to database: ', err);
//     }
//     else {
//         console.log('Connected to database: ' + config.database);
//     }
// });

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));
var router = express.Router();
app.post('/getintouch', function (req, res) {
    var mailOptions = {
        from: 'mardon.mashrabov2@gmail.com',
        to: 'mardon.mashrabov@gmail.com',
        subject: req.body.subject,
        html: " <h1> Message form Mardon.com </h1>\n    <br>\n    Sender's name: " + req.body.username + " <br>\n    Sender's email: " + req.body.email + " <br>\n    Subject is about: " + req.body.subject + " <br>\n    Message: " + req.body.message + "<br>\n    <br>\n    He/She found about Mardon.com from: " + req.body.source + "\n    "
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            res.send({
                success: false,
                message: 'Something went wrong. Try again later'
            });
        }
        else {
            res.send({
                success: true,
                message: 'Your email has successfully sent. I will contact you ASAP. Thank you!'
            });
        }
    });
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port'));
});
