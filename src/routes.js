const express = require('express');
const routes = express.Router();

const PokemonController = require('./controllers/PokemonController');

routes.get('/pokemons', PokemonController.index);
routes.get('/pokemons/:id', PokemonController.show);
routes.post('/pokemons', PokemonController.store);
routes.put('/pokemons/:id', PokemonController.update);
routes.delete('/pokemons/:id', PokemonController.destroy);

module.exports = routes;