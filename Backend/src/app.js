const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routing');
const requestLogger = require('./utilities/requestlogger');
const errorLogger = require('./utilities/errorlogger');
const cors = require('cors');
const helmet = require('helmet');
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/',router);
app.use(errorLogger);
app.listen(3000);
console.log("Server listening in port 3000");

module.exports = app;
// console.log(new Date(showDate).toLocaleDateString()>=new Date().toLocaleDateString());

// console.log(new Date("2021-10-31").toLocaleDateString(),new Date().toLocaleDateString())