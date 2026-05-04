const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO
exports.register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // validação básica
        if (!nome || !email || !senha) {
            return res.status(400).json({ msg: 'Preencha todos os campos' });
        }

        // verifica se já existe
        const userExistente = await User.findOne({ email });
        if (userExistente) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

        // criptografar senha
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoUser = new User({
            nome,
            email,
            senha: senhaHash
        });

        await novoUser.save();

        res.status(201).json({ msg: 'Usuário criado com sucesso' });

    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuário não encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if (!senhaCorreta) {
            return res.status(400).json({ msg: 'Senha inválida' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};

// ALTERAR SENHA (usuário logado)
exports.changePassword = async (req, res) => {
    try {
        const { senhaAtual, novaSenha } = req.body;

        if (!senhaAtual || !novaSenha) {
            return res.status(400).json({ msg: 'Preencha todos os campos' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(senhaAtual, user.senha);
        if (!senhaCorreta) {
            return res.status(400).json({ msg: 'Senha atual incorreta' });
        }

        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(novaSenha, salt);

        await user.save();

        res.json({ msg: 'Senha atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, novaSenha } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(novaSenha, salt);

        await user.save();

        res.json({ msg: 'Senha redefinida com sucesso' });

    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};