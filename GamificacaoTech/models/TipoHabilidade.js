"use strict";
const Sql = require("../infra/sql");
module.exports = class TipoHabilidade {
    static validate(t) {
        let resp;
        if (t.nome_tipo_habilidade == null)
            resp = "nome do tipo da habilidade não pode ser nulo\n";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_tipo_habilidade, nome_tipo_habilidade FROM tipo_habilidade");
        });
        return lista;
    }
    static async create(t) {
        let res;
        if ((res = TipoHabilidade.validate(t)))
            throw res;
        await Sql.conectar(async (sql) => {
            try {
                sql.query("INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES (?)", [t.nome_tipo_habilidade]);
            }
            catch (e) {
                if (e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${t.id_tipo_habilidade} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_tipo_habilidade, nome_tipo_habilidade FROM tipo_habilidade WHERE id_tipo_habilidade = ?", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(t) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE tipo_habilidade SET nome_tipo_habilidade = ? WHERE id_tipo_habilidade = ?", [t.nome_tipo_habilidade, t.id_tipo_habilidade]);
            if (!sql.linhasAfetadas)
                res = "Tipo de habilidade não encontrado";
        });
        return res;
    }
    static async delete(id_tipo_habilidade) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM tipo_habilidade WHERE id_tipo_habilidade = ?", [id_tipo_habilidade]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=TipoHabilidade.js.map