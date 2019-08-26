"use strict";
const Sql = require("../infra/sql");
module.exports = class Area {
    static validate(a) {
        let resp;
        if (a.nome_area == null)
            resp = "Nome da área não poder ser nulo";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select * from area");
        });
        return lista;
    }
    static async create(a) {
        let res;
        if ((res = Area.validate(a)))
            return res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("INSERT INTO area (nome_area) values (?)", [a.nome_area]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${a.id_area} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async update(a) {
        let res;
        if ((res = Area.validate(a)))
            return res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE area SET nome_area = ? WHERE id_area = ?", [a.nome_area, a.id_area]);
            if (!sql.linhasAfetadas)
                res = "Usuario Inexistente";
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_area, nome_area FROM area WHERE id_area = ?", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async delete(id) {
        let res = true;
        await Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM area WHERE id_area = ?", [id]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Area.js.map