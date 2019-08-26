"use strict";
const Sql = require("../infra/sql");
module.exports = class Curso {
    static validate(c) {
        let resp;
        if (c.nome_curso == null)
            resp = "Nome do curso não pode ser nulo\n";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_curso, nome_curso FROM curso");
        });
        return lista;
    }
    static async create(c) {
        let res;
        if ((res = Curso.validate(c)))
            throw res;
        await Sql.conectar(async (sql) => {
            try {
                sql.query("INSERT INTO curso (nome_curso) VALUES (?)", [c.nome_curso]);
            }
            catch (e) {
                if (e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${c.id_curso} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_curso, nome_curso FROM curso WHERE id_curso = ?", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(c) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE curso SET nome_curso = ? WHERE id_curso = ?", [c.nome_curso, c.id_curso]);
            if (!sql.linhasAfetadas)
                res = "Curso não encontrado";
        });
        return res;
    }
    static async delete(id_item) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM curso WHERE id_curso = ?", [id_item]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Curso.js.map