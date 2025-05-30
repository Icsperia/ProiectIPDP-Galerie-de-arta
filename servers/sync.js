// sync.js
const { sequelize } = require('./models');

(async () => {
    try {
        await sequelize.sync({ force: true }); // Șterge și recreează toate tabelele definite
        console.log('Toate tabelele au fost recreate cu succes.');
        process.exit(0);
    } catch (err) {
        console.error('Eroare la recrearea tabelelor:', err);
        process.exit(1);
    }
})();
