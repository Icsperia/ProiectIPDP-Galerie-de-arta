const setupExpress = require('./SetupExpress');
const authRoutes = require('./routes/index');
const app = setupExpress('./views/pages');
app.use('/', authRoutes);
const session = require('express-session');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.listen(3000, () => console.log('Auth app running'));