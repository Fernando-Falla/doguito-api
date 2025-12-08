const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  let conn;
try {
    conn = await db.getConnection();
    const result = await conn.execute(`SELECT * FROM clientes`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) try { await conn.close(); } catch (e) {}
  }
});
module.exports = router;
