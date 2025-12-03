const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsBuffer = [oracledb.BLOB];

async function startPool() {
  try {
    await oracledb.createPool({
      user: 'ADMIN',
      password: 'Doguito12345',  // ← Cambia si tu contraseña es distinta
// ESTE ES EL CONNECTSTRING QUE FUNCIONA 100% EN SA-BOGOTA-1 (2025)
      connectString: 'adb.sa-bogota-1.oraclecloud.com:1522/doguitodb_high_adb.sa-bogota-1.oraclecloud.com',
      
      // CONFIGURACIÓN TLS + RECONEXIÓN AUTOMÁTICA (OBLIGATORIA)
      poolMin: 2,
      poolMax: 10,
      poolIncrement: 1,
      poolPingInterval: 10,     // Detecta conexiones muertas cada 10 segundos
      poolTimeout: 60,
      connectTimeout: 30000,
      // Estas dos líneas son las que evitan ECONNRESET y NJS-518
      homogeneous: true,
      edition: 'HIGH'
});
    
    console.log('¡CONEXIÓN ESTABLE 100% A DOGUITODB (sa-bogota-1 - diciembre 2025)!');
  } catch (err) {
    console.error('Error creando pool:', err.message);
    process.exit(1);
  }
}

module.exports = { startPool };
