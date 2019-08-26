"use strict";
const Sql = require("../infra/sql");
module.exports = class Item {
    static validate(i) {
        let resp;
        if (i.img_url_item == null)
            resp = "URL da imagem não pode ser nulo\n";
        if (i.nome_item == null)
            resp = "Nome do item não pode ser nulo\n";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_item, nome_item, img_url_item FROM item");
        });
        return lista;
    }
    static async create(i) {
        let res;
        if ((res = Item.validate(i)))
            throw res;
        await Sql.conectar(async (sql) => {
            try {
                sql.query("INSERT INTO item (nome_item, img_url_item) VALUES (?, ?)", [i.nome_item, i.img_url_item]);
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
            lista = await sql.query("SELECT id_item, nome_item, img_url_item FROM item WHERE id_item = ?", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(t) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE item SET nome_item = ?, img_url_item = ? WHERE id_item = ?", [t.nome_item, t.img_url_item, t.id_item]);
            if (!sql.linhasAfetadas)
                res = "Tipo de habilidade não encontrado";
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