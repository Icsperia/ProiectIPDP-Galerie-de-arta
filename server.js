const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');


const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(session({
    secret: '1234567890abcdefghijklmnopqrstuvwxyz',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));
const staticPath = path.join(__dirname, 'src');


const indexRoutes = require('./servers/routes/index');
const shoppingCartRoutes = require('./servers/routes/shoppingCart');
const authRoutes = require('./servers/routes/auths');




app.use(express.static(staticPath));
// Routes
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', shoppingCartRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});