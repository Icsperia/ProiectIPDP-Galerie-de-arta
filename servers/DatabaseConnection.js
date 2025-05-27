const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('art_gallery', 'marian', '1234', {
    host: 'mysql_db',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

async function connectWithRetry(retries = 10, delay = 5000) {
    while (retries > 0) {
        try {
            await sequelize.authenticate();
            console.log('✅ Connected to MySQL via Sequelize');
            break;
        } catch (err) {
            console.error(`❌ Sequelize connection failed: ${err.message}`);
            retries--;
            console.log(`🔁 Retrying in ${delay / 1000}s... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, delay));
        }
    }

    if (retries === 0) {
        console.error('❌ Could not connect to MySQL. Exiting...');
        process.exit(1);
    }
}
sequelize.sync({ alter: true })
    .then(() => console.log("✅ Tables synced"))
    .catch((err) => console.error("❌ Sync error", err));

connectWithRetry().then(r => {});
module.exports = sequelize;
