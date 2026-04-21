require('dotenv').config();
const { Product, Category } = require('../models');

async function checkCategories() {
    try {
        const cats = await Category.findAll();
        console.log('--- Categories ---');
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

checkCategories();
