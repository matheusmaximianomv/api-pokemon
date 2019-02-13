const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir'); 

// Iniciando a aplicação
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando o BD
mongoose.connect('mongodb://192.168.99.101:27017/api-pokemon', { useNewUrlParser: true } );

requireDir('./src/models');

// Rotas
app.use('/api', require('./src/routes'));

app.listen(3001);