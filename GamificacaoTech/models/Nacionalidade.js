"use strict";
const Sql = require("../infra/sql");
module.exports = class Nacionalidade {
    static validate(n) {
        let resp;
        if (n.nome_nacionalidade == null)
            resp = "Nome da nacionalidade não pode ser nulo ";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_nacionalidade, nome_nacionalidade FROM nacionalidade");
        });
        return lista;
    }
    static async create(n) {
        let res;
        if ((res = Nacionalidade.validate(n)))
            throw res;
        await Sql.conectar(async (sql) => {
            try {
                sql.query("INSERT INTO nacionalidade (nome_nacionalidade) VALUES (?)", [n.nome_nacionalidade]);
            }
            catch (e) {
                if (e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${n.id_nacionalidade} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_nacionalidade, nome_nacionalidade FROM nacionalidade WHERE id_nacionalidade = ?", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(n) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE nacionalidade SET nome_nacionalidade = ? WHERE id_nacionalidade = ?", [n.nome_nacionalidade, n.id_nacionalidade]);
            if (!sql.linhasAfetadas)
                res = "Nacionalidade não encontrada";
        });
        return res;
    }
    static async delete(id_item) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM nacionalidade WHERE id_nacionalidade = ?", [id_item]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Nacionalidade.js.map