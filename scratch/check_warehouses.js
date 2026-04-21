require('dotenv').config();
const { Warehouse } = require('../models');

async function checkWarehouses() {
  try {
    const warehouses = await Warehouse.findAll();
    console.log('--- Warehouse Details ---');
    warehouses.forEach(w => {
      console.log(`ID: ${w.id} | Name: "${w.name}" | isProduction: ${w.isProduction} | Status: ${w.status}`);
    });
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkWarehouses();
