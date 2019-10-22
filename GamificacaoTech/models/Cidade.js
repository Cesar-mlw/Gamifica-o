"use strict";
const Sql = require("../infra/sql");
module.exports = class Cidade {
    static validate(c) {
        let resp;
        if (c.nome_cidade == null)
            resp = "Nome da cidade não poder ser nulo ";
        if (c.id_estado_cidade == null)
            resp = "ID do estado não pode ser nulo ";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT c.id_cidade, c.nome_cidade, c.id_estado_cidade, e.nome_estado FROM cidade c, estado e WHERE c.id_estado_cidade = e.id_estado");
        });
        return lista;
    }
    static async create(c) {
        let res;
        if ((res = Cidade.validate(c)))
            throw res;
        await Sql.conectar(async (sql) => {
            try {
                sql.query("INSERT INTO cidade (nome_cidade, id_estado_cidade) VALUES (?, ?)", [c.nome_cidade, c.id_estado_cidade]);
            }
            catch (e) {
                if (e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${c.id_cidade} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT c.id_cidade, c.nome_cidade, c.id_estado_cidade, e.nome_estado FROM cidade c, estado e WHERE id_cidade = ?", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(c) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE cidade SET nome_cidade = ?, id_estado_cidade = ? WHERE id_cidade = ?", [c.nome_cidade, c.id_estado_cidade, c.id_cidade]);
            if (!sql.linhasAfetadas)
                res = "Cidade não encontrada";
        });
        return res;
    }
    static async delete(id_item) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM cidade WHERE id_cidade = ?", [id_item]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Cidade.js.map