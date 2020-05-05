require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
// const http = require('http');
// const {setupWebsocket} = require('./Websocket');

const app = express();
// const server = http.Server(app);
// setupWebsocket(server);

app.use(express.json());

app.use(cors());

mongoose.connect(
    // 'mongodb://localhost/Graficos',
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

requireDir('./src/models');

app.use('/', require('./src/routes'));

app.listen(process.env.PORT || 3000);