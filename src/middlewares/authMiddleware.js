const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const userId = req.headers["x-user-id"];

    if (!authHeader) {
        return res.status(401).json({
            msg: "Token não informado"
        });
    }

    if (!userId) {
        return res.status(401).json({
            msg: "ID do usuário não informado"
        });
    }

    try {

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (Number(decoded.id) !== Number(userId)) {
            return res.status(403).json({
                msg: "Usuário não autorizado"
            });
        }

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            msg: "Token inválido"
        });

    }

};