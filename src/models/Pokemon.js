const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    cod: {
        type: Number,
        required: true,
    },

    type: {
        type: [],
        required: true,
    },

    urlImg: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    region: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

PokemonSchema.plugin(mongoosePaginate);
mongoose.model('Pokemon', PokemonSchema);