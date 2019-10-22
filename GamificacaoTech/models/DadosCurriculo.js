"use strict";
const Sql = require("../infra/sql");
module.exports = class DadosCurriculo {
    static validate(d) {
        let resp;
        if (d.nome_completo_dados_curriculo == null)
            resp += "O nome não pode ser nulo ";
        if (d.nacionalidade_dados_curriculo == null)
            resp += "A nacionalidade não pode ser nula ";
        if (d.endereco_dados_curriculo == null)
            resp += "O endereco não pode ser nulo ";
        if (d.email_dados_curriculo == null)
            resp += "O email não pode ser nulo ";
        if (d.telefone_dados_curriculo == null)
            resp += "O telefone não pode ser nulo ";
        if (d.ra_usuario == null)
            resp += "O RA do usuário não pode ser nulo ";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT * FROM dados_curriculo");
        });
        return lista;
    }
    static async create(d) {
        let res;
        if ((res = DadosCurriculo.validate(d)))
            return res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("INSERT INTO dados_curriculo (nome_completo_dados_curriculo, nacionalidade_dados_curriculo, endereco_dados_curriculo, email_dados_curriculo, telefone_dados_curriculo, sinopse_dados_curriculo, ra_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)", [d.nacionalidade_dados_curriculo, d.nacionalidade_dados_curriculo, d.endereco_dados_curriculo, d.email_dados_curriculo, d.telefone_dados_curriculo, d.sinopse_dados_curriculo, d.ra_usuario]);
            }
            catch (e) {
                if (e.code && e.code == 'ER_DUP_ENTRY')
                    res = `O ID ${d.id_dados_curriculo} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async update(d) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE dados_curriculo SET nome_completo_dados_curriculo = ?, nacionalidade_dados_curriculo = ?, endereco_dados_curriculo = ?, email_dados_curriculo = ?, telefone_dados_curriculo = ?, sinopse_dados_curriculo = ?", [d.nome_completo_dados_curriculo, d.nacionalidade_dados_curriculo, d.endereco_dados_curriculo, d.email_dados_curriculo, d.telefone_dados_curriculo, d.sinopse_dados_curriculo]);
            if (!sql.linhasAfetadas)
                res = "Dados Inexistente";
        });
        return res;
    }
    static async readByUserId(ra) {
        let res = null;
        await Sql.conectar(async (sql) => {
            res = await sql.query("SELECT d.nome_completo_dados_curriculo, n.nome_nacionalidade, e.logradouro_endereco, e.numero_endereco, e.complemento_endereco, d.email_dados_curriculo, d.telefone_dados_curriculo, d.sinopse_dados_curriculo, d.ra_usuario FROM dados_curriculo d, endereco e, nacionalidade n WHERE d.nacionalidade_dados_curriculo = n.id_nacionalidade AND d.endereco_dados_curriculo = e.id_endereco AND d.ra_usuario = ?", [ra]);
        });
        return res;
    }
    static async delete(ra) {
        let res = true;
        await Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM dados_curriculo WHERE id_dados_curriculo = ?", [ra]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=DadosCurriculo.js.map