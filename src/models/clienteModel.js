const { pool } = require("../config/db");

async function listar() {
    const [rows] = await pool.execute(
        "SELECT * FROM clientes"
    );

    return rows;
}

async function buscarPorId(id) {
    const [rows] = await pool.execute(
        "SELECT * FROM clientes WHERE id_cliente = ?",
        [id]
    );

    return rows[0];
}

async function criar(nome, telefone, status) {
    const [result] = await pool.execute(
        `INSERT INTO clientes
        (nome, telefone, status)
        VALUES (?, ?, ?)`,
        [nome, telefone, status]
    );

    return result.insertId;
}

async function atualizar(id, nome, telefone, status) {
    await pool.execute(
        `UPDATE clientes
        SET
            nome = ?,
            telefone = ?,
            status = ?
        WHERE id_cliente = ?`,
        [nome, telefone, status, id]
    );
}

async function excluir(id) {
    await pool.execute(
        "DELETE FROM clientes WHERE id_cliente = ?",
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