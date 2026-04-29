const { sequelize } = require('../models');

async function checkCols() {
    try {
        const [results] = await sequelize.query('DESCRIBE suppliers');
        console.log('📋 Suppliers Table Structure:');
        console.table(results);
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to describe table:', err);
        process.exit(1);
    }
}

checkCols();
