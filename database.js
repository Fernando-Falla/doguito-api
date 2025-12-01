const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsBuffer = [oracledb.BLOB];

async function startPool() {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER || 'ADMIN',
      password: process.env.DB_PASSWORD || 'Doguito12345',
      // Easy Connect correcto para tu DB DOGUITODB en región Bogotá
      connectString: 'admin.doguitodb_high.sa-bogota-1.oraclecloud.com:1522/doguitodb_high.sa-bogota-1.oraclecloud.com',
      poolMin: 2,
      poolMax: 10,
      poolIncrement: 1
    });
    console.log('Conexión a Oracle Database establecida correctamente (Thin mode - sa-bogota-1)');
  } catch (err) {
    console.error('Error al conectar con Oracle DB:', err.message);
    process.exit(1);
  }
}

module.exports = { startPool };
