const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const controller = require('../controllers/eventoController');

router.post('/', auth, controller.criarEvento);
router.get('/', controller.listarEventos);
router.put('/:id', auth, controller.atualizarEvento);
router.delete('/:id', auth, controller.deletarEvento);

module.exports = router;