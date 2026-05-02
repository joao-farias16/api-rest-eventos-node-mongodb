const Evento = require('../models/Evento');

// CRIAR EVENTO
exports.criarEvento = async (req, res) => {
    try {
        const { titulo, data, descricao } = req.body;

        const novoEvento = new Evento({
            titulo,
            data,
            descricao,
            criador: req.user.id
        });

        await novoEvento.save();

        res.status(201).json(novoEvento);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao criar evento' });
    }
};

// LISTAR EVENTOS
exports.listarEventos = async (req, res) => {
    try {
        const eventos = await Evento.find().populate('criador', 'nome email');
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao listar eventos' });
    }
};

// ATUALIZAR EVENTO
exports.atualizarEvento = async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);

        if (!evento) {
            return res.status(404).json({ msg: 'Evento não encontrado' });
        }

        // só o criador pode editar
        if (evento.criador.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Não autorizado' });
        }

        const atualizado = await Evento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(atualizado);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao atualizar evento' });
    }
};

// DELETAR EVENTO
exports.deletarEvento = async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);

        if (!evento) {
            return res.status(404).json({ msg: 'Evento não encontrado' });
        }

        if (evento.criador.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Não autorizado' });
        }

        await evento.deleteOne();

        res.json({ msg: 'Evento deletado' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao deletar evento' });
    }
};