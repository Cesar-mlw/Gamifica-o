"use strict";
const Sql = require("../infra/sql");
module.exports = class Endereco {
    static validate(e) {
        let resp;
        if (e.logradouro_endereco == null)
            resp = "Nome do Logradouro não pode ser nulo ";
        if (e.numero_endereco == null)
            resp = "Número não pode ser nulo ";
        if (e.id_cidade == null)
            resp = "ID da cidade não deve ser nulo ";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT e.id_endereco, e.logradouro_endereco, e.numero_endereco, e.complemento_endereco, c.nome_cidade, e.id_cidade FROM Endereco e, Cidade c WHERE e.id_cidade = c.id_cidade");
        });
        return lista;
    }
    static async create(e) {
        let res;
        if ((res = Endereco.validate(e)))
            throw res;
        await Sql.conectar(async (sql) => {
            try {
                sql.query("INSERT INTO endereco (logradouro_endereco, numero_endereco, complemento_endereco, id_cidade) VALUES (?, ?, ?, ?)", [e.logradouro_endereco, e.numero_endereco, e.complemento_logradouro, e.id_cidade]);
            }
            catch (e) {
                if (e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${e.id_endereco} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT e.id_endereco, e.logradouro_endereco, e.numero_endereco, e.complemento_endereco, e.id_cidade, c.nome_cidade  FROM endereco e, cidade c WHERE e.id_cidade = c.id_cidade", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(e) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE endereco SET logradouro_endereco = ?, numero_endereco = ?, complemento_endereco = ?, id_cidade = ? WHERE id_endereco = ?", [e.logradouro_endereco, e.numero_endereco, e.complemento_logradouro, e.id_cidade, e.id_endereco]);
            if (!sql.linhasAfetadas)
                res = "Curso não encontrado";
        });
        return res;
    }
    static async delete(id_item) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM endereco WHERE id_endereco = ?", [id_item]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Endereco.js.map