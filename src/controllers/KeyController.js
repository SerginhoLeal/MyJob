const mongoose = require('mongoose');
const Sea = mongoose.model('Job');
const parseStrings = require('./parseString');

module.exports = {
    async index(req, res){
        const {_id} = req.query;

        const desc = parseStrings(_id);

        const sens = await Sea.find({
            _id:{
                $in:desc,
            },
        });

        return res.json({sens});
    }
}