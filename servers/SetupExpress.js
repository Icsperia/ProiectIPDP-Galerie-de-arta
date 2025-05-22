const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const Redis = require('ioredis');
const {RedisStore} = require("connect-redis");



module.exports = function (viewsPath) {
    const app = express();

    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, viewsPath));
    app.use(express.static(path.join(__dirname, 'src')));
    app.use(express.static(path.join(__dirname, 'public')));

    const redisClient = new Redis({
        host: 'redis',
        port: 6379
    });

    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: 'superSecretKey',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        }

    }));

    app.use((req, res, next) => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        next();
    });

    return app;
};
