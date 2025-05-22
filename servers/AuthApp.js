// AuthApp.js or CartApp.js
const setupExpress = require('./SetupExpress');
const routes = require('./routes/auths'); // or './routes/shoppingCart'

const app = setupExpress('views/pages');

app.use('/auth', routes);

app.listen(3000, () => {
    console.log('App running on port 3000');
});
