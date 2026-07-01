const categoriaModel = require("../models/categoriaModel");

exports.listar = async (req, res) => {
    try {
        const categorias = await categoriaModel.listar();

        res.status(200).json(categorias);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao listar categorias"
        });

    }
};

exports.buscarPorId = async (req, res) => {

    try {

        const categoria = await categoriaModel.buscarPorId(req.params.id);

        if (!categoria) {
            return res.status(404).json({
                msg: "Categoria não encontrada"
            });
        }

        res.status(200).json(categoria);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao buscar categoria"
        });

    }

};

exports.criar = async (req, res) => {

    try {

        const { nome } = req.body;

        if (!nome) {

            return res.status(400).json({
                msg: "Informe o nome da categoria"
            });

        }

        const id = await categoriaModel.criar(nome);

        res.status(201).json({
            msg: "Categoria criada com sucesso",
            id
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao criar categoria"
        });

    }

};

exports.atualizar = async (req, res) => {

    try {

        const { nome } = req.body;

        await categoriaModel.atualizar(
            req.params.id,
            nome
        );

        res.json({
            msg: "Categoria atualizada com sucesso"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao atualizar categoria"
        });

    }

};

exports.excluir = async (req, res) => {

    try {

        await categoriaModel.excluir(req.params.id);

        res.json({
            msg: "Categoria excluída com sucesso"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: "Erro ao excluir categoria"
        });

    }

};