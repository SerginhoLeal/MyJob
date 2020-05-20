const mongoose = require('mongoose');
const Sea = mongoose.model('Job');
const parseStrings = require('./parseString');

module.exports = {
    async index(req, res){
        const {elo} = req.query;

        const desc = parseStrings(elo);

        const sens = await Sea.find({
            elo:{
                $in:desc,
            },
        });

        return res.json({sens});
    },
    
    async index2(req, res){
        const {nome} = req.query;

        const desc2 = parseStrings(nome);

        const sens = await Sea.find({
            nome:{
                $in:desc2,
            },
        });

        return res.json({sens});
    }
}