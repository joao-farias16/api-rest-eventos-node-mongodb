const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const controller = require('../controllers/eventoController');

/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: CRUD de eventos
 */

/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Criar evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               data:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evento criado
 *       401:
 *         description: Não autorizado
 */
router.post('/', auth, controller.criarEvento);

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Listar eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *       500:
 *         description: Erro interno
 */
router.get('/', controller.listarEventos);

/**
 * @swagger
 * /api/eventos/{id}:
 *   get:
 *     summary: Buscar evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento não encontrado
 */
router.get('/:id', controller.buscarEventoPorId);

/**
 * @swagger
 * /api/eventos/{id}:
 *   put:
 *     summary: Atualizar evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento atualizado
 *       404:
 *         description: Evento não encontrado
 */
router.put('/:id', auth, controller.atualizarEvento);

/**
 * @swagger
 * /api/eventos/{id}:
 *   delete:
 *     summary: Excluir evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento removido
 *       404:
 *         description: Evento não encontrado
 */
router.delete('/:id', auth, controller.deletarEvento);

module.exports = router;