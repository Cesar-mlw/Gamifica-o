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
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT u.id_item_usuario, u.ra_usuario, u.id_item, u.dt_item, i.nome_item, i.img_url_item, u.cellx_item, u.celly_item, u.width, u.height FROM item_usuario u, item i WHERE u.id_item = i.id_item");
        });
        return lista;
    }
    static async create(i) {
        let res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("INSERT INTO item_usuario (id_item, ra_usuario, dt_item, width, height) VALUES (?, ?, ?, ?, ?)", [i.id_item, i.ra_usuario, i.dt_item, i.width, i.height]);
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
            lista = await sql.query("select i.id_item, i.nome_item, i.img_url_item, u.dt_item, u.id_item_usuario, u.id_item, u.cellx_item, u.celly_item, u.width, u.height from item_usuario u, item i where ra_usuario = ? and u.id_item = i.id_item", [ra]);
        });
        return lista;
    }
    static async readPlacedItems(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT u.id_item_usuario, u.ra_usuario, u.id_item, u.cellx_item, u.celly_item, u.width, u.height, u.positioned_item, i.nome_item, i.img_url_item, i.preco_item FROM item_usuario u, item i WHERE u.ra_usuario = ? AND u.positioned_item = TRUE AND u.id_item = i.id_item", [ra]);
        });
        return lista;
    }
    static async readNotPlacedItems(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT u.id_item_usuario, u.ra_usuario, u.id_item, u.cellx_item, u.celly_item, u.width, u.height, u.positioned_item, i.nome_item, i.img_url_item, i.preco_item FROM item_usuario u, item i WHERE u.ra_usuario = ? AND u.positioned_item = FALSE AND u.id_item = i.id_item", [ra]);
        });
        return lista;
    }
    static async readOccupiedPlaces(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT cellx_item, celly_item FROM item_usuario u WHERE u.ra_usuario = ? AND u.positioned_item = true", [ra]);
        });
        return lista;
    }
    static async readImageStyle(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT u.width, u.height, i.img_url_item FROM item_usuario u, item i WHERE u.ra_usuario = ? AND u.positioned_item = false", [ra]);
        });
        return lista;
    }
    static async update(i) {
        let res;
        Sql.conectar(async (sql) => {
            await sql.query("UPDATE item_usuario SET id_item = ?, dt_item = ?, width = ?, height = ? WHERE id_item_usuario = ?", [i.id_item, i.dt_item, i.width, i.height, i.id_item_usuario]);
            if (!sql.linhasAfetadas)
                res = "Usuário não possui esse item";
        });
        return res;
    }
    static async placeObject(id_item_usuario, cellx, celly) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("UPDATE item_usuario SET cellx_item = ?, celly_item = ?, positioned_item = true where id_item_usuario = ?", [cellx, celly, id_item_usuario]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
    static async removeObject(id_item_usuario) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("UPDATE item_usuario SET cellx_item = NULL, celly_item = NULL, positioned_item = false where id_item_usuario = ?", [id_item_usuario]);
            if (!sql.linhasAfetadas)
                res = false;
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