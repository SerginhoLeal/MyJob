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
    }
}