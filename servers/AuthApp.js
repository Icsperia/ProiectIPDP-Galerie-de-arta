
const setupExpress = require('./SetupExpress');
const routes = require('./routes/auths');

const app = setupExpress('views/pages');

app.use('/auth', routes);

app.listen(3000, () => {
    console.log('App running on port 3000');
});
process.on('SIGINT', () => {
    console.log(' Caught SIGINT, shutting down gracefully...');
    process.exit(0);
});

process.on('exit', (code) => {
    console.log(`Process exited with code ${code}`);
});
