const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const LikesController = require('./controllers/LikeCrontroller');
const NewJobController = require('./controllers/NewjobCrontroller');
const SearchController = require('./controllers/SearchCrontroller');
const KeyController = require('./controllers/KeyController');

const routes = express.Router();

routes.post('/PwbsOs9YtfLi85clN8Sz', UsuarioController.login);
routes.post('/NRBQlog6f2Pwnqe3adQJ', UsuarioController.store);

routes.get('/OTT7RrH1TRC7Ypo2iYtR', NewJobController.index);
routes.post('/C7Ypo2iFU0OTT7RrH1TR', NewJobController.store);

routes.get('/C7Ypo2iYtfLi8RrH1TRR', SearchController.index);
routes.get('/C7YLi8H1TRRpo2RriYtf', KeyController.index);

routes.post('/devs/:devId/Graphic', LikesController.store);

module.exports = routes;