const pedidoModel = require("../models/pedidoModel");

exports.listar = async (req, res) => {
    try {

        const pedidos = await pedidoModel.listar();

        res.status(200).json(pedidos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao listar pedidos"
        });

    }
};

exports.buscarPorId = async (req, res) => {

    try {

        const pedido = await pedidoModel.buscarPorId(req.params.id);

        if (!pedido) {
            return res.status(404).json({
                msg: "Pedido não encontrado"
            });
        }

        res.status(200).json(pedido);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao buscar pedido"
        });

    }

};

exports.criar = async (req, res) => {

    try {

        const {
            data,
            clientes_id_cliente,
            produtos
        } = req.body;

        if (!data || !clientes_id_cliente) {

            return res.status(400).json({
                msg: "Preencha todos os campos"
            });

        }

        const idPedido = await pedidoModel.criar(
            data,
            clientes_id_cliente
        );

        if (Array.isArray(produtos)) {

            for (const produto of produtos) {

                await pedidoModel.adicionarProduto(
                    idPedido,
                    produto.produtos_id_produto,
                    produto.quantidade,
                    produto.valor
                );

            }

        }

        res.status(201).json({
            msg: "Pedido criado com sucesso",
            id: idPedido
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao criar pedido"
        });

    }

};

exports.atualizar = async (req, res) => {

    try {

        const {
            data,
            clientes_id_cliente
        } = req.body;

        await pedidoModel.atualizar(
            req.params.id,
            data,
            clientes_id_cliente
        );

        res.json({
            msg: "Pedido atualizado com sucesso"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao atualizar pedido"
        });

    }

};

exports.excluir = async (req, res) => {

    try {

        await pedidoModel.excluir(req.params.id);

        res.json({
            msg: "Pedido excluído com sucesso"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao excluir pedido"
        });

    }

};