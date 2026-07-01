const { pool } = require("../config/db");

async function listar() {
    const [rows] = await pool.execute(
        "SELECT * FROM categorias"
    );

    return rows;
}

async function buscarPorId(id) {
    const [rows] = await pool.execute(
        "SELECT * FROM categorias WHERE id_categoria = ?",
        [id]
    );

    return rows[0];
}

async function criar(nome) {
    const [result] = await pool.execute(
        "INSERT INTO categorias (nome) VALUES (?)",
        [nome]
    );

    return result.insertId;
}

async function atualizar(id, nome) {
    await pool.execute(
        "UPDATE categorias SET nome = ? WHERE id_categoria = ?",
        [nome, id]
    );
}

async function excluir(id) {
    await pool.execute(
        "DELETE FROM categorias WHERE id_categoria = ?",
        [id]
    );
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};