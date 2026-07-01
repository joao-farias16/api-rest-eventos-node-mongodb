const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usuarioModel = require("../models/usuarioModel");

// REGISTRO
exports.register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                msg: "Preencha todos os campos"
            });
        }

        const usuario = await usuarioModel.buscarPorEmail(email);

        if (usuario) {
            return res.status(400).json({
                msg: "Usuário já existe"
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const id = await usuarioModel.criar(
            nome,
            email,
            senhaHash
        );

        res.status(201).json({
            msg: "Usuário criado com sucesso",
            id
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "Erro no servidor"
        });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {

        const { email, senha } = req.body;

        const usuario = await usuarioModel.buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({
                msg: "Usuário não encontrado"
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                msg: "Senha inválida"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro no servidor"
        });

    }
};

// ALTERAR SENHA
exports.changePassword = async (req, res) => {

    try {

        const { senhaAtual, novaSenha } = req.body;

        const usuario = await usuarioModel.buscarPorId(req.user.id);

        if (!usuario) {

            return res.status(404).json({
                msg: "Usuário não encontrado"
            });

        }

        const senhaCorreta = await bcrypt.compare(
            senhaAtual,
            usuario.senha
        );

        if (!senhaCorreta) {

            return res.status(400).json({
                msg: "Senha atual incorreta"
            });

        }

        const senhaHash = await bcrypt.hash(
            novaSenha,
            10
        );

        await usuarioModel.alterarSenha(
            usuario.id,
            senhaHash
        );

        res.json({
            msg: "Senha alterada com sucesso"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro no servidor"
        });

    }

};

// RESET SENHA
exports.resetPassword = async (req, res) => {

    try {

        const { email, novaSenha } = req.body;

        const usuario = await usuarioModel.buscarPorEmail(email);

        if (!usuario) {

            return res.status(404).json({
                msg: "Usuário não encontrado"
            });

        }

        const senhaHash = await bcrypt.hash(
            novaSenha,
            10
        );

        await usuarioModel.alterarSenha(
            usuario.id,
            senhaHash
        );

        res.json({
            msg: "Senha redefinida com sucesso"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro no servidor"
        });

    }

};