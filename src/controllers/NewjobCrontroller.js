const mongoose = require('mongoose');
// const parseStrings = require('./parseString');
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
        } = req.body;

        // let user = await Grap.findOne({nick})

    try{
        if(await Grap.findOne({nick}))//se encontrar um email o cadastro não será realizado
            return res.status(400).send({error:'Empresa já em uso!'});

        user = await Grap.create({
            nick,
            nome,
            elo,
            num,
            wpp,
        });

        // const sendSocketMessageTo = findConnections(
        //     elo
        // );
        // console.log(sendSocketMessageTo);
        // sendMessage(sendSocketMessageTo, 'new-job', user)

        res.send({user});

        }catch(err){
            return res.status(400).send({error:'fail'});
        }
    },

    async destroy(req,res){
        await Grap.findByIdAndRemove(req.params.id);
        return res.send();
    },

};