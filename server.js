const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const router = require('./routes/authentication');


const indexRoutes = require('./routes/index');
const imageRoutes = require('./routes/image');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));
const staticPath = path.join(__dirname, 'src');

app.use(express.static(staticPath));
// Routes
app.use('/', indexRoutes);
app.use('/', imageRoutes);
app.use('/', router);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
