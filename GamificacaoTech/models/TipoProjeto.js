"use strict";
const Sql = require("../infra/sql");
module.exports = class TipoProjeto {
    static validate(t) {
        let resp;
        if (t.nome_tipo_projeto == null)
            resp = "nome do tipo do projeto não está presente\n";
        if (t.pontos_tipo_projeto == null)
            resp += "pontos que o tipo do projeto dá não estão presentes";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_tipo_projeto, nome_tipo_projeto, pontos_tipo_projeto FROM tipo_projeto");
        });
        return lista;
    }
    static async create(t) {
        let res;
        if ((res = TipoProjeto.validate(t)))
            throw res;
        await Sql.conectar(async (sql) => {
            try {
                sql.query("INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES (?, ?)", [t.nome_tipo_projeto, t.pontos_tipo_projeto]);
            }
            catch (e) {
                if (e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${t.id_tipo_projeto} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_tipo_projeto, nome_tipo_projeto, pontos_tipo_projeto FROM tipo_projeto WHERE id_tipo_projeto = ?", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(t) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE tipo_projeto SET nome_tipo_projeto = ?, pontos_tipo_projeto = ? WHERE id_tipo_projeto = ?", [t.nome_tipo_projeto, t.pontos_tipo_projeto, t.id_tipo_projeto]);
            if (!sql.linhasAfetadas)
                res = "Tipo de Projeto não encontrado";
        });
        return res;
    }
    static async delete(id_tipo_projeto) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM tipo_projeto WHERE id_tipo_projeto = ?", [id_tipo_projeto]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=TipoProjeto.js.map