const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *       400:
 *         description: Erro de validação
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: Alterar senha
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Senha alterada
 *       401:
 *         description: Não autorizado
 */
router.put('/change-password', authMiddleware, authController.changePassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   put:
 *     summary: Resetar senha
 *     tags: [Autenticação]
 *     responses:
 *       200:
 *         description: Senha redefinida
 *       400:
 *         description: Erro na operação
 */
router.put('/reset-password', authController.resetPassword);

module.exports = router;