const { pool } = require("../config/db");

async function listar() {
    const [rows] = await pool.execute(`
        SELECT
            p.id_produto,
            p.nome,
            p.valor,
            p.estoque,
            p.categorias_id_categoria,
            c.nome AS categoria
        FROM produtos p
        INNER JOIN categorias c
            ON p.categorias_id_categoria = c.id_categoria
    `);

    return rows;
}

async function buscarPorId(id) {
    const [rows] = await pool.execute(
        "SELECT * FROM produtos WHERE id_produto = ?",
        [id]
    );

    return rows[0];
}

async function criar(nome, valor, estoque, categorias_id_categoria) {
    const [result] = await pool.execute(
        `INSERT INTO produtos
        (nome, valor, estoque, categorias_id_categoria)
        VALUES (?, ?, ?, ?)`,
        [nome, valor, estoque, categorias_id_categoria]
    );

    return result.insertId;
}

async function atualizar(id, nome, valor, estoque, categorias_id_categoria) {
    await pool.execute(
        `UPDATE produtos
        SET
            nome = ?,
            valor = ?,
            estoque = ?,
            categorias_id_categoria = ?
        WHERE id_produto = ?`,
        [nome, valor, estoque, categorias_id_categoria, id]
    );
}

async function atualizarEstoque(id, estoque) {
    await pool.execute(
        `UPDATE produtos
        SET estoque = ?
        WHERE id_produto = ?`,
        [estoque, id]
    );
}

async function excluir(id) {
    await pool.execute(
        "DELETE FROM produtos WHERE id_produto = ?",
        [id]
    );
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    atualizarEstoque,
    excluir
};