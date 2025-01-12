/**
 * @param Mino - Streaming Pleasure.
 * @author PAUL JH GOWASEB <SourceCodeMagnus119> email: <paulusg131@gmaii.com>
 */
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const morgan =require('morgan');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
// const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const session = require('express-session');
// const Databse =  require('./db/database');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(session({ secret: process.env.TOKEN_KEY, 
    resave: true, saveUninitialized: true, 
    cookie: { secure: true, maxAge: 60000 }
}));
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet({
    strictTransportSecurity: true,
    originAgentCluster: true,
    referrerPolicy: true,
    xContentTypeOptions: true,
    xDnsPrefetchControl: true,
    xDownloadOptions: true,
    xFrameOptions: true,
    xPermittedCrossDomainPolicies: true,
    xPoweredBy: true,
    contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "http://mino.com"],
        },
      },
}));
app.get('/', (req, res, next) => {
    console.log(`Middleware Called!`);
    next()
});
app.use('/home', (req, res) => {
    res
    .status(200)
    .json({
        Title: "Mino",
        description: "Stream your pleasure",
        message: "Welcome to Mino, Please enjoy your stay."
    });
});

/**
 * @param API Endpoints.
 */

/**
 * @param Rate Limiter.
 * @return Redirects brute force attacks and suspecious requests.
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: () => {
        res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }
});

app.use(limiter);

/**
 * @param Server Session implementationn.
 */
const accessSession = require('./middleware/session');

app.get('/', accessSession);

/**
 * @param Error Handler.
 */
const e = require("./EH/errorHandler");

app.use(e);

const port = process.env.PORT;
const time = new Date();
app.listen(port, () => {
    console.log(
        `Server running on port ${port} __YOU'RE GOT DAMN RIGHT!`, time
    )
});

module.exports = { app };