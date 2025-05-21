const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

module.exports = function (viewsPath) {
    const app = express();

    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, viewsPath));
    const staticPath = path.join(__dirname, 'src');

    app.use(express.static(staticPath));
    app.use(express.static(path.join(__dirname, 'public')));

    return app;
}