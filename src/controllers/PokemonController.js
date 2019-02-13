const mongoose = require('mongoose');
const Pokemon = mongoose.model('Pokemon');

module.exports = {

    async index(req, res) {

        const { page = 1 } = req.query;
        const pokemons = await Pokemon.paginate({}, { page, limit: 10 });
        // Requisição feita com sucesso, no entanto sem conteúdo.
        if (!(pokemons.docs[0])) return res.status(204).send();

        else return res.status(202).json({ data: { pokemons } });
    },

    async show(req, res) {
        try {
            //const pokemon = await Pokemon.findById(req.params.id);
            const pokemon = await Pokemon.findOne({_id: req.params.id});

            if(!(pokemon)) return res.status(404).send({ error: { title: 'Pokemon Not Found', description: 'The ID of this pokemon does not match the database' } });

            return res.status(202).json({ data: pokemon });
        } catch (erro) {
            return res.status(404).send({ error: { title: 'Pokemon Not Found', description: 'Incorrect ID Format' } });
        }
    },

    async store(req, res) {

        if (!(req.body.name) || !(req.body.cod) || !(req.body.type) || !(req.body.urlImg) || !(req.body.description) || !(req.body.region)) {
            // Arrays de Validação;
            const objectKeys = Object.keys(req.body);
            const keysRequire = ["name", "cod", "type", "urlImg", "description", "region"];
            const notFoundKeys = [];
            // Mapeamento para indentificar quais campos não estão presentes na requisição, retirando os campos existentes do array keysRequire;
            keysRequire.map(key => {
                for (object of objectKeys) {
                    if (key === object) {
                        delete keysRequire[keysRequire.indexOf(key)];
                    }
                }
            });
            // Transferindo dados != null para o array notFoundKeys;
            keysRequire.map(key => { if (!!(key)) notFoundKeys.push(key) });

            return res.status(400).send({ error: { title: 'Absent Fields', description: notFoundKeys } });
        }
        const pokemon = await Pokemon.create(req.body);
        return res.status(201).json(pokemon);
    },

    async update(req, res) {

        // Verficação de Campos Ausentes
        if (!(req.body.name) || !(req.body.cod) || !(req.body.type) || !(req.body.urlImg) || !(req.body.description) || !(req.body.region)) {
            // Arrays de Validação;
            const objectKeys = Object.keys(req.body);
            const keysRequire = ["name", "cod", "type", "urlImg", "description", "region"];
            const notFoundKeys = [];
            // Mapeamento para indentificar quais campos não estão presentes, retirando o campos existentes do array keysRequire;
            keysRequire.map(key => {
                for (object of objectKeys) {
                    if (key === object) {
                        delete keysRequire[keysRequire.indexOf(key)];
                    }
                }
            });
            // Transferindo dados != null para o array notFoundKeys;
            keysRequire.map(key => { if (!!(key)) notFoundKeys.push(key) });
            return res.status(400).send({ error: { title: 'Absent Fields', description: notFoundKeys } });
        }
        
        const pokemon = await Pokemon.findOneAndUpdate(req.params.id, req.body);
        return res.status(202).json(pokemon);
    },

    async destroy(req, res) {
        try {
            const result = await Pokemon.findOneAndDelete(req.params.id);
            // Quando o resultado não existe.
            if (!(result)) res.status(406).send({ error: { title: 'Id Not Valid', description: 'The Id is Not In The Database' } });
            return res.send({ sucess: 'Deletado com Sucesso' }).status(202);
        } catch (erro) {
            // Caso você faça mais de uma requisição de DELETE.
            return res.status(406).send({ error: { title: 'Id Not Valid', description: 'Incorrect ID Format' } });
        }
    }
}