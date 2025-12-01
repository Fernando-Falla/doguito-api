const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');

router.get('/razas', async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM razas`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) await conn.close();
  }
});

module.exports = router;
