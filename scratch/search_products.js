require('dotenv').config();
const { Product } = require('../models');
const { Op } = require('sequelize');

async function search() {
    try {
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: '%BUBAI%' } },
                    { name: { [Op.like]: '%test%' } },
                    { name: { [Op.like]: '%waRE%' } }
                ]
            }
        });

        console.log('--- Search Results ---');
        products.forEach(p => {
            console.log(`ID: ${p.id} | Name: "${p.name}" | SKU: ${p.sku} | Co: ${p.companyId}`);
        });
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

search();
