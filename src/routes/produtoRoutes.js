const express = require("express");
const router = express.Router();

const produtoController = require("../controllers/produtoController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Listar produtos
 *     tags: [Produtos]
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
 *         description: Lista de produtos
 *       401:
 *         description: Não autorizado
 */
router.get("/", authMiddleware, produtoController.listar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Produtos]
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
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", authMiddleware, produtoController.buscarPorId);

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Criar produto
 *     tags: [Produtos]
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
 *               - nome
 *               - valor
 *               - estoque
 *               - categorias_id_categoria
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Notebook Gamer
 *               valor:
 *                 type: number
 *                 format: float
 *                 example: 4999.90
 *               estoque:
 *                 type: integer
 *                 example: 15
 *               categorias_id_categoria:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Produto criado
 *       400:
 *         description: Dados inválidos
 */
router.post("/", authMiddleware, produtoController.criar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualizar produto
 *     tags: [Produtos]
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
 *               nome:
 *                 type: string
 *                 example: Notebook Gamer
 *               valor:
 *                 type: number
 *                 format: float
 *                 example: 5200.00
 *               estoque:
 *                 type: integer
 *                 example: 10
 *               categorias_id_categoria:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Produto atualizado
 */
router.put("/:id", authMiddleware, produtoController.atualizar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Excluir produto
 *     tags: [Produtos]
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
 *         description: Produto excluído
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", authMiddleware, produtoController.excluir);

module.exports = router;