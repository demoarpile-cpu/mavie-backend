const { sequelize } = require('../config/db');
async function run() {
  try {
    console.log('Adding warehouse_id to products table...');
    await sequelize.query("ALTER TABLE products ADD COLUMN warehouse_id INT NULL");
    console.log('Column added successfully.');
  } catch (err) {
    if (err.message.includes('Duplicate column name')) {
      console.log('Column already exists, skipping.');
    } else {
      console.error('Error adding column:', err);
    }
  }
  process.exit();
}
run();
