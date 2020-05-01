const mongoose = require('mongoose');

const Grap = mongoose.model('Usuario');
const Grap2 = mongoose.model('Job');

module.exports = {
    async store(req, res){
        const { user } = req.headers;//pega o usuario logado.
        const { devId } = req.params;//pega o usuario selecionado e não logado.

        const UsuarioLogado = await Grap.findById(user);//não preciso mexer em nada aqui.
        const UsuarioReceptor = await Grap2.findById(devId);//eu poderia trocar o findById por create.

        try{
            if(UsuarioLogado.nome == UsuarioReceptor.likes)
                return res.status(400).json({error: 'Nop'})


            UsuarioReceptor.likes.push(UsuarioLogado.nome);

            await UsuarioReceptor.save();//salva dentro do array.

        }catch{
            return res.status(400).send({error:'fail'});
        }

        return res.json(UsuarioLogado);//retorna para o usuario logado.
    }
};

// if(!loggedDev.nome == targetDev.likes){
//     targetDev.likes.push(loggedDev.nome);

//     targetDev.save();//salva dentro do array.
// }