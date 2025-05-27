const models = require('./servers/models'); // sau './models/index' dacă nu merge direct

console.log('✅ Verificare model Art: ', typeof models.Art);
console.log('✅ Chei exportate:', Object.keys(models));
const { Art } = require('./servers/models');
console.log(typeof Art); // Trebuie să returneze: function sau object
