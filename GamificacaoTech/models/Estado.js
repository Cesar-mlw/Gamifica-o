"use strict";
const Sql = require("../infra/sql");
module.exports = class Estado {
    static validate(e) {
        let resp;
        if (e.nome_estado == null)
            resp = "Nome do estado não poder ser nulo ";
        if (e.id_pais_estado == null)
            resp = "ID do pais não pode ser nulo ";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT e.id_estado, e.nome_estado, e.id_pais_estado, p.nome_estado FROM estado e, pais p WHERE e.id_pais_estado = p.id_pais");
        });
        return lista;
    }
    static async create(e) {
        let res;
        if ((res = Estado.validate(e)))
            throw res;
        await Sql.conectar(async (sql) => {
            try {
                sql.query("INSERT INTO estado (nome_estado, id_pais_estado) VALUES (?, ?)", [e.nome_estado, e.id_pais_estado]);
            }
            catch (e) {
                if (e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${e.id_estado} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT e.id_estado, e.nome_estado, e.id_pais_estado, p.nome_pais FROM estado e, pais p WHERE e.id_pais_estado = p.id_pais AND id_estado = ?", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(e) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE estado SET nome_estado = ?, id_pais_estado = ? WHERE id_estado = ?", [e.nome_estado, e.id_pais_estado, e.id_estado]);
            if (!sql.linhasAfetadas)
                res = "Estado não encontrado";
        });
        return res;
    }
    static async delete(id_item) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM estado WHERE id_estado = ?", [id_item]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Estado.js.map