const pedidoModel = require("../models/pedidoModel");
const produtoModel = require("../models/produtoModel");

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

        if (!Array.isArray(produtos) || produtos.length === 0) {

            return res.status(400).json({
                msg: "Adicione pelo menos um produto."
            });

        }

        // Verifica o estoque antes de criar o pedido
        for (const produto of produtos) {

            const produtoBanco =
                await produtoModel.buscarPorId(
                    produto.produtos_id_produto
                );

            if (!produtoBanco) {

                return res.status(404).json({
                    msg: "Produto não encontrado."
                });

            }

            if (produto.quantidade > produtoBanco.estoque) {

                return res.status(400).json({
                    msg: `Estoque insuficiente para ${produtoBanco.nome}. Disponível: ${produtoBanco.estoque}`
                });

            }

        }

        // Agora cria o pedido
        const idPedido = await pedidoModel.criar(
            data,
            clientes_id_cliente
        );

        // Adiciona os produtos e atualiza o estoque
        for (const produto of produtos) {

            const produtoBanco =
                await produtoModel.buscarPorId(
                    produto.produtos_id_produto
                );

            await pedidoModel.adicionarProduto(
                idPedido,
                produto.produtos_id_produto,
                produto.quantidade,
                produto.valor
            );

            await produtoModel.atualizarEstoque(
                produtoBanco.id_produto,
                produtoBanco.estoque - produto.quantidade
            );

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