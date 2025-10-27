const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/', userRoutes);

app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://192.168.100.192:${PORT}`));
