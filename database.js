const oracledb = require('oracledb');

oracledb.initOracleClient({
  libDir: '/home/opc/doguito-api-es/instantclient_19_19',
  configDir: '/home/opc/doguito-api-es/network/admin'
});

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
async function getConnection() {
  return await oracledb.getConnection({
    user: 'ADMIN',
    password: 'Doguito12345',
    connectString: 'doguitodbnueva_high'
  });
}

module.exports = { getConnection };
