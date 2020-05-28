const mongoose = require('mongoose');
const parseStrings = require('./parseString');
const {findConnections, sendMessage} = require('../../Websocket')

const Grap = mongoose.model('Job');

module.exports = {
    async index(req, res){
        const Gra = await Grap.paginate({},{page:1, limit:50});
        return res.json(Gra);
    },

    async store(req, res){        
        const {
            nick,
            nome,
            elo,
            num,
            wpp,
            ask,
        } = req.body;

        const EloArray = parseStrings(elo);

            // let user = await Grap.findOne({nome})
        if(await Grap.findOne({nome}))//se encontrar um email o cadastro não será realizado
            return res.status(400).send({error:'Só é possível criar uma única vez'});

        user = await Grap.create({
            nick,
            nome,
            elo:EloArray,
            num,
            wpp,
            ask
        });

        const sendSocketMessageTo = findConnections(
            EloArray,
        );
        console.log(sendSocketMessageTo);
        sendMessage(sendSocketMessageTo, 'new-job', user)

        return res.json({user});

    },

    async update(req, res){
        const user = await Grap.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(user);
    },

    async destroy(req,res){
        await Grap.findByIdAndRemove(req.params.id);
        return res.send();
    },

};