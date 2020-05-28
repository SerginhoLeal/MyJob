const {Schema, model} = require('mongoose');
const MP = require('mongoose-paginate');

const SearchSchema = new Schema({
    nick:{
        type: String,
        required: true,
    },
    nome:{
        type: String,
        required: true,
    },
    elo:{
        type: [String],
        required: true,
    },
    num:{
        type: String,
        required: false,
    },
    wpp:{
        type: String,
        required: true,
    },
    ask:{
        type: String,
        required: true,
    },
    likes:{
        type: [String],
        unique:false
    },
},{
    timestamps:true,
});

SearchSchema.plugin(MP);

module.exports = model('Job', SearchSchema);