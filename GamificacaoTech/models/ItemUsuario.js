"use strict";
const Sql = require("../infra/sql");
module.exports = class ItemUsuario {
    static validate(i) {
        let res;
        if (i.ra_usuario == null)
            res = "O RA do usuário não pode ser nulo\n";
        if (i.id_item == null)
            res = "O id do item não pode ser nulo\n";
        if (i.dt_item == null)
            res = "A data do item não pode ser nula\n";
        return res;
    }
    static async list() {
        let lista = null;
        Sql.conectar(async (sql) => {
            sql.query("SELECT id_item_usuario, ra_usuario, id_item, dt_item FROM item_usuario");
        });
        return lista;
    }
    static async create(i) {
        let res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("INSERT INTO item_usuario (id_item, ra_usuario, dt_item) VALUES (?, ?, ?)", [i.id_item, i.ra_usuario, i.dt_item]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${i.id_item_usuario} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select i.id_item, i.nome_item, i.img_url_item, u.dt_item from item_usuario u, item i where fk_usuario_id = ? and u.fk_item_id = i.id_item", [ra]);
        });
        return lista;
    }
    static async update(i) {
        let res;
        Sql.conectar(async (sql) => {
            await sql.query("UPDATE item_usuario SET id_item = ?, dt_item = ? WHERE id_item_usuario = ?", [i.id_item, i.dt_item, i.id_item_usuario]);
            if (!sql.linhasAfetadas)
                res = "Usuário não possui esse item";
        });
        return res;
    }
    static async delete(id) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM item_usuario WHERE id_item_usuario = ?", [id]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=ItemUsuario.js.map