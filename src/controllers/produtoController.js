const produtoModel = require("../models/produtoModel");

exports.listar = async (req, res) => {
    try {

        const produtos = await produtoModel.listar();

        res.status(200).json(produtos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao listar produtos"
        });

    }
};

exports.buscarPorId = async (req, res) => {

    try {

        const produto = await produtoModel.buscarPorId(req.params.id);

        if (!produto) {
            return res.status(404).json({
                msg: "Produto não encontrado"
            });
        }

        res.status(200).json(produto);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao buscar produto"
        });

    }

};

exports.criar = async (req, res) => {

    try {

        const {
            nome,
            valor,
            estoque,
            categorias_id_categoria
        } = req.body;

        if (
            !nome ||
            valor == null ||
            estoque == null ||
            !categorias_id_categoria
        ) {
            return res.status(400).json({
                msg: "Preencha todos os campos"
            });
        }

        const id = await produtoModel.criar(
            nome,
            valor,
            estoque,
            categorias_id_categoria
        );

        res.status(201).json({
            msg: "Produto criado com sucesso",
            id
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao criar produto"
        });

    }

};

exports.atualizar = async (req, res) => {

    try {

        const {
            nome,
            valor,
            estoque,
            categorias_id_categoria
        } = req.body;

        await produtoModel.atualizar(
            req.params.id,
            nome,
            valor,
            estoque,
            categorias_id_categoria
        );

        res.json({
            msg: "Produto atualizado com sucesso"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao atualizar produto"
        });

    }

};

exports.excluir = async (req, res) => {

    try {

        await produtoModel.excluir(req.params.id);

        res.json({
            msg: "Produto excluído com sucesso"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao excluir produto"
        });

    }

};