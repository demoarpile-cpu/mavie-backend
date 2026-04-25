const { sequelize } = require('../config/db');
async function check() {
  try {
    const [results] = await sequelize.query("DESCRIBE products");
    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error(err);
  }
  process.exit();
}
check();
