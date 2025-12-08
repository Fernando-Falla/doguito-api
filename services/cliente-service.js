const oracledb = require('oracledb');

if (oracledb.defaults) {
  oracledb.defaults.fetchAsBuffer = [oracledb.BLOB];
}
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function obtenerClientes() {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(`SELECT * FROM clientes`);
    return result.rows;
  } finally {
    if (connection) {
      try { await connection.close(); } catch (err) { console.error(err); }
    }
  }
}

module.exports = { obtenerClientes };
