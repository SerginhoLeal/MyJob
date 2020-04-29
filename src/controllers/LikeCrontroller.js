const mongoose = require('mongoose');

const Grap = mongoose.model('Usuario');
const Grap2 = mongoose.model('Job');

module.exports = {
    async store(req, res){
        const { user } = req.headers;//pega o usuario logado.
        const { devId } = req.params;//pega o usuario selecionado e não logado.

        const loggedDev = await Grap.findById(user);//não preciso mexer em nada aqui.
        const targetDev = await Grap2.findById(devId);//eu poderia trocar o findById por create.


        if(!loggedDev.nome == targetDev.likes){
            targetDev.likes.push(loggedDev.nome);

            targetDev.save();//salva dentro do array.
        }
        
        return res.json(loggedDev);//retorna para o usuario logado.
    }
};