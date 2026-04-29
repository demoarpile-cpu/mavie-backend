const { Product, Supplier, Warehouse } = require('../models');

async function checkData() {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'name', 'warehouseId', 'supplierId'],
            limit: 10
        });
        console.log('📋 Sample Products:');
        products.forEach(p => console.log(JSON.stringify(p.toJSON())));

        const suppliers = await Supplier.findAll({ limit: 5 });
        console.log('📋 Sample Suppliers:');
        console.table(suppliers.map(s => s.toJSON()));

        const warehouses = await Warehouse.findAll({ limit: 5 });
        console.log('📋 Sample Warehouses:');
        console.table(warehouses.map(w => w.toJSON()));

        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to check data:', err);
        process.exit(1);
    }
}

checkData();
