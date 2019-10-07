"use strict";
const Sql = require("../infra/sql");
module.exports = class Links {
    static validate(l) {
        let res;
        if (l.ra_usuario == null)
            res = "O RA do usuário não pode ser nulo ";
        if (l.titulo_link == null)
            res = "O id do título do link não pode ser nulo ";
        if (l.txt_link == null)
            res = "O texto do link não pode ser nulo ";
        return res;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT l.id_link, l.titulo_link, t.nome_titulo_link, l.txt_link, l.ra_usuario FROM links l, titulo_link t WHERE l.titulo_link = t.id_titulo_link");
        });
        return lista;
    }
    static async create(l) {
        let res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("INSERT INTO links (titulo_link, txt_link, ra_usuario) VALUES (?, ?, ?)", [l.titulo_link, l.txt_link, l.ra_usuario]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${l.id_link} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT l.id_link, t.nome_titulo_link, l.titulo_link, l.txt_link, l.ra_usuario FROM links l, titulo_link t WHERE l.titulo_link = t.id_titulo_link and ra_usuario = ?", [ra]);
        });
        return lista;
    }
    static async update(l) {
        let res;
        Sql.conectar(async (sql) => {
            await sql.query("UPDATE links SET txt_link = ?, titulo_link = ? WHERE ra_usuario = ?", [l.txt_link, l.titulo_link, l.ra_usuario]);
            if (!sql.linhasAfetadas)
                res = "Usuário não possui esse Link";
        });
        return res;
    }
    static async delete(id) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM links WHERE id_link = ?", [id]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Links.js.map