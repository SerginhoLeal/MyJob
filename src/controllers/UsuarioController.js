const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const authConfig = require('../Config/auth.json');

const Grap = mongoose.model('Usuario');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400,
    });
}

module.exports = {
    async login(req, res){
        const {nome, password} = req.body;

        const user = await Grap.findOne({nome}).select('+password');
        
        if(!user)
            return res.status(400).send({error:'Nome inexistente'});
        
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({error:'Senha invalida'});
        
        user.password = undefined;

        res.send({
            user,
            token:generateToken({id: user.id}),
        });
    },

    async store(req, res){
        const {nome} = req.body;
    try{
        if(await Grap.findOne({nome}))//se encontrar um email o cadastro não será realizado
            return res.status(400).send({error:'Nome já em uso!'});

        const user = await Grap.create(req.body);

        res.send({
            user,
            token:generateToken({id: user.id}),
        });

        user.password = undefined;

        }catch(err){
            return res.status(400).send({error:'fail........................................'});
        }
    },
};