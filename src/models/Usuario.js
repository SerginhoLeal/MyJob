const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nome:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    likes:[{
        type: String,
        ref: 'Usuario',
    }],
},{
    timestamps:true,
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})


module.exports = model('Usuario', UserSchema);