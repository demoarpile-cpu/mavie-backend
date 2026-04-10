const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function masterSync() {
    const mysqlUrl = process.env.DATABASE_URL;
    if (!mysqlUrl) {
        console.error('❌ No DATABASE_URL found in .env');
        process.exit(1);
    }

    // We will try to sync both 'railway' and 'warehouse_wms' just in case
    const dbNames = ['railway', 'warehouse_wms'];
    
    for (const dbName of dbNames) {
        try {
            console.log(`\n🔄 Attempting to sync Database: ${dbName}...`);
            
            // Reconstruct URL with specific DB name
            const urlParts = mysqlUrl.split('/');
            urlParts[urlParts.length - 1] = dbName;
            const targetUrl = urlParts.join('/');

            const seq = new Sequelize(targetUrl, { logging: false, dialect: 'mysql' });
            
            await seq.authenticate();
            console.log(`✅ Connected to ${dbName}`);

            // Manually add columns if missing
            console.log(`🛠️ Patching 'roles' table in ${dbName}...`);
            
            try {
                await seq.query("ALTER TABLE roles ADD COLUMN is_system TINYINT(1) DEFAULT 0 AFTER permissions");
                console.log(`  ➕ Added 'is_system' to ${dbName}`);
            } catch (e) {
                console.log(`  ℹ️ 'is_system' already exists or skipping: ${e.message}`);
            }

            try {
                await seq.query("ALTER TABLE roles ADD COLUMN company_id INT AFTER is_system");
                console.log(`  ➕ Added 'company_id' to ${dbName}`);
            } catch (e) {
                console.log(`  ℹ️ 'company_id' already exists or skipping: ${e.message}`);
            }

            await seq.close();
        } catch (err) {
            console.log(`  ❌ Could not process database '${dbName}': ${err.message}`);
        }
    }
    
    console.log('\n✨ Master Sync Finished.');
    process.exit(0);
}

masterSync();
