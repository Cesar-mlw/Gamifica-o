"use strict";
const Sql = require("../infra/sql");
module.exports = class Habilidade {
    static validate(h) {
        let res;
        if (h.nome_habilidade == null || h.range_habilidade == null || h.ra_usuario == null)
            res = "ERRO";
        return res;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select * from habilidade");
        });
        return lista;
    }
    static async create(h) {
        let res;
        if ((res = Habilidade.validate(h)))
            return res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("INSERT INTO habilidade (nome_habilidade, range_habilidade, ra_usuario) values (?, ?, ?)", [h.nome_habilidade, h.range_habilidade, h.ra_usuario]);
            }
            catch (e) {
                if (e.code && e.code == 'ER_DUP_ENTRY')
                    res = `O ID ${h.id_habilidade} já está e uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async update(h) {
        let res;
        if ((res = Habilidade.validate(h)))
            return res;
        Sql.conectar(async (sql) => {
            await sql.query("UPDATE habilidade SET nome_habilidade = ?, range_habilidade = ?, tipo_habilidade = ?", [h.nome_habilidade, h.range_habilidade, h.tipo_habilidade]);
            if (!sql.linhasAfetadas)
                res = "Habilidade Inexistente";
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT id_habilidade, nome_habilidade, range_habilidade, ra_usuario, tipo_habiliadade FROM habilidade WHERE id_habilidade = ?", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async delete(id) {
        let res = true;
        await Sql.conectar(async (sql) => {
            await sql.query("DELETE habiliadade WHERE id_habilidade = ?", [id]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Habilidade.js.map