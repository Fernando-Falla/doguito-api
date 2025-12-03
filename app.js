const express = require('express');
const cors = require('cors');

const clienteRoutes = require('./routes/cliente-routes');
 razaRoutes = require('./routes/raza-routes');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', clienteRoutes);
app.use('/api', razaRoutes);

// Iniciamos el pool y luego el servidor
(async () => {
  try {
    await db.startPool();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  } catch (err) {
    console.error('No se pudo iniciar la aplicación:', err);
    process.exit(1);
  }
})();
