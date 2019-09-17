"use strict";
const Sql = require("../infra/sql");
module.exports = class TituloLink {
    static validate(t) {
        let res;
        if (t.nome_titulo_link == null)
            res = "O nome do título do link não pode ser nulo ";
        return res;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_titulo_link, nome_titulo_link FROM titulo_link");
        });
        return lista;
    }
    static async create(t) {
        let res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("INSERT INTO titulo_link (nome_titulo_link) VALUES (?)", [t.nome_titulo_link]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${t.id_titulo_link} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_titulo_link, nome_titulo_link FROM titulo_link WHERE id_titulo_link = ?", [id]);
        });
        return lista;
    }
    static async update(t) {
        let res;
        Sql.conectar(async (sql) => {
            await sql.query("UPDATE titulo_link SET nome_titulo_link = ? WHERE id_titulo_link = ?", [t.nome_titulo_link, t.id_titulo_link]);
            if (!sql.linhasAfetadas)
                res = "Titulo do link não existe";
        });
        return res;
    }
    static async delete(id) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM titulo_link WHERE id_titulo_link = ?", [id]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=TituloLinks.js.map