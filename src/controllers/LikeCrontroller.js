const mongoose = require('mongoose');

const Grap = mongoose.model('Usuario');
const Grap2 = mongoose.model('Job');

module.exports = {
    async store(req, res){
        const { user } = req.headers;//pega o usuario logado.
        const { devId } = req.params;//pega o usuario selecionado e não logado.
                                     // será que posso trocar params por body? {devId} -> {graficos}

        const loggedDev = await Grap.findById(user);//não preciso mexer em nada aqui.
        const targetDev = await Grap2.findById(devId);//eu poderia trocar o findById por create.
        
        if(!targetDev){//caso o destinatario não exista.
            return res.status(400).json({error: 'morto'});
        }

        targetDev.likes.push(loggedDev.nome);//é aqui onde adicionamos no array, troquei para salvar no destinatario.
                                            //será que posso trocar o _id por number?

        await targetDev.save();//salva dentro do array.
        
        return res.json(loggedDev);//retorna para o usuario logado.
    }
};