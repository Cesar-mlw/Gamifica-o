"use strict";
const Sql = require("../infra/sql");
module.exports = class Pais {
    static validate(p) {
        let resp;
        if (p.nome_pais == null)
            resp = "Nome do pais não pode ser nulo";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_pais, nome_pais FROM pais");
        });
        return lista;
    }
    static async create(p) {
        let res;
        if ((res = Pais.validate(p)))
            throw res;
        await Sql.conectar(async (sql) => {
            try {
                sql.query("INSERT INTO pais (nome_pais) VALUES (?)", [p.nome_pais]);
            }
            catch (e) {
                if (e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${p.id_pais} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_pais, nome_pais FROM pais WHERE id_pais = ?", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(p) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE pais SET nome_pais = ? WHERE id_pais = ?", [p.id_pais]);
            if (!sql.linhasAfetadas)
                res = "Cidade não encontrada";
        });
        return res;
    }
    static async delete(id_item) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM pais WHERE id_pais = ?", [id_item]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Pais.js.map