const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, 'views','pages'))
// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));

app.use(cookieParser());

// Routes
const pageRoutes = require('./routes/index');
const imageRoutes = require('./routes/image');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/authentication');
const shoppingCartRoutes = require('./routes/shoppingCart');

app.use('/', pageRoutes);
app.use('/', imageRoutes);
app.use('/api/users', userRoutes);
app.use('/', loginRoutes);
app.use('/', shoppingCartRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
