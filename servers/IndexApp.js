const setupExpress = require('./SetupExpress');
const authRoutes = require('./routes/index');
const app = setupExpress('./views/pages');
app.use('/', authRoutes);
app.listen(3000, () => console.log('Auth app running'));