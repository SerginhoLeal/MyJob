const mongoose = require('mongoose');
// const parseStrings = require('./parseString');
const {findConnections, sendMessage} = require('../../Websocket')

const GrapUsuario = mongoose.model('Usuario');
const Grap = mongoose.model('Job');

module.exports = {
    async index(req, res){
        const Gra = await Grap.paginate({},{page:1, limit:50});
        return res.json(Gra);
    },

    async store(req, res){        
        const {
            _id,
            nick,
            nome,
            elo,
            num,
            wpp,
        } = req.body;

        let user = await Grap.findOne({nick})

    try{
        user = await Grap.create({
            _id,
            nick,
            nome,
            elo,
            num,
            wpp,
        });

        const sendSocketMessageTo = findConnections(
            elo
        );
        console.log(sendSocketMessageTo);
        sendMessage(sendSocketMessageTo, 'new-job', user)

        res.send({user});

        }catch(err){
            return res.status(400).send({error:'fail'});
        }
    },

    async destroy(req,res){
        const { user } = req.headers;
        const { idDel } = req.params;

        const UsuarioLogado = await GrapUsuario.findById(user);
        const UsuarioReceptor = await Grap.findById(idDel);

        if(UsuarioLogado.nome != UsuarioReceptor.nome)//para que o criador não possa dar like em si mesmo.
            return res.status(400).json({error: 'Você não é o usuário'})//retorna o aviso.

        await Grap.findByIdAndRemove(idDel);
        
        return res.send();
    },

};