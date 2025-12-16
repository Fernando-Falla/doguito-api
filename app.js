const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
// Para que el LB no corte la primera conexión lenta (Thick + wallet)
app.set('trust proxy', true);

app.use(cors());
app.use(express.json());

// Health-check ultra-rápido (0 ms, sin tocar Oracle)
app.get('/', (req, res) => {
  res.status(200).send('OK');
});
app.use('/api/clientes', require('./routes/cliente-routes.js'));
app.use('/api/razas',    require('./routes/raza-routes.js'));

// ESCUCHA EXPLÍCITA EN TODAS LAS INTERFACES + MANEJO DE ERRORES
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('API ESTABLE CON THICK + WALLET');
  console.log(`Server running on port ${PORT} (0.0.0.0)`);
  console.log(`LB → http://149.130.165.152`);
});
server.on('error', (error) => {
  console.error('FATAL ERROR ON SERVER START:', error);
  process.exit(1);
});

// Opcional: keep-alive para evitar ECONNRESET en conexiones largas
server.keepAliveTimeout = 65000;   // 65 segundos (más que el timeout del LB)
server.headersTimeout = 66000;     // 66 segundos

