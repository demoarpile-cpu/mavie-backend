// No dotenv here, let it default to sqlite if config/db.js allows
const { Product, Category } = require('../models');

async function checkSQLite() {
    try {
        const cats = await Category.findAll();
        console.log('--- Categories (SQLite?) ---');
        cats.forEach(c => {
            console.log(`ID: ${c.id} | Name: ${c.name}`);
        });

        const fragranza = cats.find(c => c.name === 'Fragranza');
        if (fragranza) {
            const products = await Product.findAll({
                where: { categoryId: fragranza.id }
            });
            console.log(`\n--- Products in Fragranza (ID: ${fragranza.id}) ---`);
            products.forEach(p => {
                console.log(`ID: ${p.id} | Name: "${p.name}" | SKU: ${p.sku}`);
            });
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkSQLite();
