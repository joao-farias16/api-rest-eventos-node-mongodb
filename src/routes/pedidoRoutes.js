const express = require("express");
const router = express.Router();

const pedidoController = require("../controllers/pedidoController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Listar pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário autenticado
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       401:
 *         description: Não autorizado
 */
router.get("/", authMiddleware, pedidoController.listar);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Buscar pedido por ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário autenticado
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get("/:id", authMiddleware, pedidoController.buscarPorId);

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Criar pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário autenticado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *               - clientes_id_cliente
 *             properties:
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-01"
 *               clientes_id_cliente:
 *                 type: integer
 *                 example: 1
 *               produtos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtos_id_produto:
 *                       type: integer
 *                       example: 1
 *                     quantidade:
 *                       type: integer
 *                       example: 2
 *                     valor:
 *                       type: number
 *                       format: float
 *                       example: 199.90
 *     responses:
 *       201:
 *         description: Pedido criado
 *       400:
 *         description: Dados inválidos
 */
router.post("/", authMiddleware, pedidoController.criar);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   put:
 *     summary: Atualizar pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário autenticado
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-01"
 *               clientes_id_cliente:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pedido atualizado
 */
router.put("/:id", authMiddleware, pedidoController.atualizar);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Excluir pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário autenticado
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido excluído
 *       404:
 *         description: Pedido não encontrado
 */
router.delete("/:id", authMiddleware, pedidoController.excluir);

module.exports = router;