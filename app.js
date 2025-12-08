const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.status(200).send('OK'));

app.use('/api/clientes', require('./routes/cliente-routes.js'));
app.use('/api/razas',    require('./routes/raza-routes.js'));

app.listen(PORT, '0.0.0.0', () => {
  console.log('API ESTABLE CON THICK + WALLET');
});
