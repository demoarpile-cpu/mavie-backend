const { sequelize } = require('../models');

async function listTables() {
    try {
        const [results] = await sequelize.query('SHOW TABLES');
        console.log('📋 Tables in Database:');
        console.table(results);
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to list tables:', err);
        process.exit(1);
    }
}

listTables();
