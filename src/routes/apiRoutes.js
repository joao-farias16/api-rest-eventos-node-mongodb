const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Retorna a versão e o status da API
 *     tags: [API]
 *     responses:
 *       200:
 *         description: API online
 */
router.get("/status", (req, res) => {
    res.status(200).json({
        versao: "2.0.0",
        status: "online"
    });
});

module.exports = router;