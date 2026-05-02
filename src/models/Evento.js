const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    descricao: {
        type: String
    },
    criador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    participantes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Evento', EventoSchema);