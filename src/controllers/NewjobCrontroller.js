const mongoose = require('mongoose');
// const parseStrings = require('./parseString');

const Grap = mongoose.model('Job');

module.exports = {
    async index(req, res){
        const Gra = await Grap.paginate({},{page:1, limit:50});
        return res.json(Gra);
    },

    async store(req, res){
        const {
            _id,
            nome,
            elo,
            num,
            wpp,
        } = req.body;

    try{
        if(await Grap.findOne({nome}))//se encontrar um email o cadastro não será realizado
            return res.status(400).send({error:'Nome já em uso!'});

        // const desc = parseStrings(elo);

        const user = await Grap.create({
            _id,
            nome,
            elo,
            num,
            wpp,
        });

        res.send({user});

        }catch(err){
            return res.status(400).send({error:'fail'});
        }
    },

};