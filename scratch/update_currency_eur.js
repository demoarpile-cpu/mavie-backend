// SAFE UPDATE ONLY - No DELETE, No DROP
// This script updates currency from USD to EUR in the live database
require('dotenv').config();
const { sequelize, Product } = require('../models');

async function updateCurrencyToEur() {
  try {
    await sequelize.authenticate();
    console.log('Connected to database:', process.env.DB_DIALECT, process.env.DATABASE_URL?.split('@')[1]?.split('/')[0]);

    // Step 1: Count how many will be affected (READ ONLY)
    const usdProducts = await Product.findAll({ where: { currency: 'USD' } });
    console.log(`\nFound ${usdProducts.length} products with currency = 'USD'`);

    if (usdProducts.length === 0) {
      console.log('Nothing to update. Exiting safely.');
      process.exit(0);
    }

    // Step 2: Show what will change (preview)
    console.log('\n--- Preview of products that will be updated ---');
    usdProducts.slice(0, 10).forEach(p => {
      console.log(`  ID: ${p.id} | Name: "${p.name}" | Currency: ${p.currency} → EUR`);
    });
    if (usdProducts.length > 10) {
      console.log(`  ... and ${usdProducts.length - 10} more`);
    }

    // Step 3: Perform UPDATE (safe - no delete)
    const [affectedRows] = await sequelize.query(
      `UPDATE products SET currency = 'EUR' WHERE currency = 'USD'`
    );

    console.log(`\n✅ Successfully updated ${usdProducts.length} products: USD → EUR`);
    console.log('No data was deleted. Only the currency field was updated.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

updateCurrencyToEur();
