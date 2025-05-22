// AuthApp.js or CartApp.js
const setupExpress = require('./SetupExpress');
const routes = require( './routes/shoppingCart'); // or

const app = setupExpress('views/pages');

app.use('/cart', routes);

app.listen(3000, () => {
    console.log('App running on port 3000');
});
