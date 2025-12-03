const express = require('express');
const router = express.Router();
const { obtenerClientes } = require('../services/cliente-service');

router.get('/clientes', async (req, res) => {
  try {
    const clientes = await obtenerClientes();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
