"use strict";
const Sql = require("../infra/sql");
module.exports = class Item {
    static validate(i) {
        let resp;
        if (i.img_url_item == null)
            resp = "URL da imagem não pode ser nulo\n";
        if (i.nome_item == null)
            resp = "Nome do item não pode ser nulo\n";
        if (i.id_area == null)
            resp = "Id da área não pode ser nulo";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT i.id_item, i.nome_item, i.img_url_item, i.preco_item, i.id_area, a.nome_area FROM item i, area a where i.id_area = a.id_area");
        });
        return lista;
    }
    static async create(i) {
        let res;
        if ((res = Item.validate(i)))
            throw res;
        await Sql.conectar(async (sql) => {
            try {
                sql.query("INSERT INTO item (nome_item, img_url_item, preco_item, id_area) VALUES (?, ?, ?)", [i.nome_item, i.img_url_item, i.preco_item, i.id_area]);
            }
            catch (e) {
                if (e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${i.id_item} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT i.id_item, i.nome_item, i.img_url_item, i.preco_item, i.id_area, a.nome_area FROM item i, area a WHERE id_item = ? AND i.id_item = a.id_area", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(i) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE item SET nome_item = ?, img_url_item = ?, preco_item = ?, id_area = ? where id_item = ?", [i.nome_item, i.img_url_item, i.preco_item, i.id_item, i.id_area]);
            if (!sql.linhasAfetadas)
                res = "Item não existente";
        });
        return res;
    }
    static async delete(id_item) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM item WHERE id_item = ?", [id_item]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Item.js.map