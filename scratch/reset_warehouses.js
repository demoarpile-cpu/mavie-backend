const { sequelize } = require('../config/db');
async function run() {
  try {
    console.log('Resetting warehouse_id for all products...');
    await sequelize.query("UPDATE products SET warehouse_id = NULL");
    console.log('Reset successful.');
  } catch (err) {
    console.error('Error resetting:', err);
  }
  process.exit();
}
run();
