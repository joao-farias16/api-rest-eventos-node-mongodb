const { pool } = require("../config/db");

async function buscarPorEmail(email) {
    const [rows] = await pool.execute(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
    );

    return rows[0];
}

async function buscarPorId(id) {
    const [rows] = await pool.execute(
        "SELECT * FROM usuarios WHERE id = ?",
        [id]
    );

    return rows[0];
}

async function criar(nome, email, senha) {
    const [result] = await pool.execute(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senha]
    );

    return result.insertId;
}

async function alterarSenha(id, senha) {
    await pool.execute(
        "UPDATE usuarios SET senha = ? WHERE id = ?",
        [senha, id]
    );
}

module.exports = {
    buscarPorEmail,
    buscarPorId,
    criar,
    alterarSenha
};