const clienteModel = require("../models/clienteModel");

exports.listar = async (req, res) => {
    try {

        const clientes = await clienteModel.listar();

        res.status(200).json(clientes);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao listar clientes"
        });

    }
};

exports.buscarPorId = async (req, res) => {

    try {

        const cliente = await clienteModel.buscarPorId(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                msg: "Cliente não encontrado"
            });
        }

        res.status(200).json(cliente);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao buscar cliente"
        });

    }

};

exports.criar = async (req, res) => {

    try {

        const {
            nome,
            telefone,
            status
        } = req.body;

        if (!nome || !telefone || status == null) {

            return res.status(400).json({
                msg: "Preencha todos os campos"
            });

        }

        const id = await clienteModel.criar(
            nome,
            telefone,
            status
        );

        res.status(201).json({
            msg: "Cliente criado com sucesso",
            id
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao criar cliente"
        });

    }

};

exports.atualizar = async (req, res) => {

    try {

        const {
            nome,
            telefone,
            status
        } = req.body;

        await clienteModel.atualizar(
            req.params.id,
            nome,
            telefone,
            status
        );

        res.json({
            msg: "Cliente atualizado com sucesso"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao atualizar cliente"
        });

    }

};

exports.excluir = async (req, res) => {

    try {

        await clienteModel.excluir(req.params.id);

        res.json({
            msg: "Cliente excluído com sucesso"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao excluir cliente"
        });

    }

};