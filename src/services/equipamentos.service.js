import pool from "../database/conexao.js";

class EquipamentosService {

    async listarTodos() {
        const [rows] = await pool.query(
            "SELECT * FROM equipamentos"
        );

        return rows;
    }

    async buscarPorId(id) {
        const [rows] = await pool.query(
            "SELECT * FROM equipamentos WHERE id = ?",
            [id]
        );

        return rows[0] || null;
    }

    async cadastrar(nome, categoria, condicao, disponivel) {
        const [resultado] = await pool.query(
            `INSERT INTO equipamentos
            (nome, categoria, condicao, disponivel)
            VALUES (?, ?, ?, ?)`,
            [nome, categoria, condicao, disponivel]
        );

        return {
            id: resultado.insertId,
            nome,
            categoria,
            condicao,
            disponivel
        };
    }

    async alterarDisponibilidade(id, disponivel) {
        const [resultado] = await pool.query(
            `UPDATE equipamentos
            SET disponivel = ?
            WHERE id = ?`,
            [disponivel, id]
        );

        if (resultado.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(id);
    }
}

export default new EquipamentosService();