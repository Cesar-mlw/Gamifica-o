"use strict";
const Sql = require("../infra/sql");
const GeradorHash = require("../utils/geradorHash");
module.exports = class Usuario {
    static validate(u) {
        let resp;
        if (u.ra_usuario == null)
            resp = "RA não pode ser nulo\n";
        if (u.id_curso == null)
            resp += "ID do curso não pode ser nulo\n";
        if (u.nome_usuario == null)
            resp += "Nome do usuário não pode ser nulo";
        if (u.email_usuario == null)
            resp += "E-mail do usuário não pode ser nulo";
        if (u.pontos_totais == null)
            resp += "Pontos totais do usuário não pode ser nulo";
        if (u.nome_usuario == null)
            resp += "Nome do usuário não pode ser nulo";
        if (u.nome_usuario == null)
            resp += "Nome do usuário não pode ser nulo";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = (await sql.query("SELECT u.ra_usuario, u.id_curso, u.nome_usuario, u.email_usuario, u.pontos_totais, u.dt_entrada_usuario, u.senha_usuario, c.nome_curso FROM usuario u, curso c WHERE c.id_curso = u.id_curso"));
        });
        return lista;
    }
    static async create(u) {
        let res;
        u.senha_usuario = await GeradorHash.criarHash(u.senha_usuario);
        if ((res = Usuario.validate(u)))
            return res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("INSERT INTO usuario (ra_usuario, id_curso, nome_usuario, email_usuario, pontos_totais, dt_entrada_usuario, senha_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)", [
                    u.ra_usuario,
                    u.id_curso,
                    u.nome_usuario,
                    u.email_usuario,
                    u.pontos_totais,
                    u.dt_entrada_usuario,
                    u.senha_usuario
                ]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O RA ${u.ra_usuario.toString()} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = (await sql.query("select u.ra_usuario, u.id_curso, u.nome_usuario, u.pontos_totais, u.email_usuario, u.dt_entrada_usuario, c.nome_curso from usuario u, curso c where ra_usuario = ? and u.id_curso = c.id_curso", [id]));
        });
        return (lista && lista[0]) || null;
    }
    static async readUserPoints(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select p.id_area as 'id', a.nome_area as 'nome', sum(t.pontos_tipo_projeto) as 'pontos' from projeto p, tipo_projeto t, area a where p.id_tipo_projeto = t.id_tipo_projeto and p.id_area = a.id_area and ra_usuario = ? group by p.id_area order by p.id_area", [ra]);
        });
        return lista;
    }
    static async update(u) {
        //
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE usuario SET id_curso = ?, nome_usuario = ?, email_usuario = ?, pontos_totais = ?, dt_entrada_usuario = ? WHERE ra_usuario = ?", [
                u.id_curso,
                u.nome_usuario,
                u.email_usuario,
                u.pontos_totais,
                u.dt_entrada_usuario,
                u.ra_usuario
            ]);
            if (!sql.linhasAfetadas)
                res = "Usuário Inexistente";
        });
        return res;
    }
    static async updatePassword(id, pass) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE usuario SET senha_usuario = ? WHERE ra_usuario = ?", [
                pass,
                id
            ]);
            if (!sql.linhasAfetadas)
                res = "Usuário Inexistente";
        });
        return res;
    }
    static async updateRA(id, ra) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE usuario SET ra_usuario = ? WHERE ra_usuario = ?", [
                ra,
                id
            ]);
            if (!sql.linhasAfetadas)
                res = "Usuário Inexistente";
        });
        return res;
    }
    static async delete(ra) {
        let res = true;
        await Sql.conectar(async (sql) => {
            await sql.query("delete from usuario where ra_usuario = ?", [ra]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
    //FAZER FUNÇÃO PARA REDIRECIONAR O USUÁRIO PARA OUTRA TABELA
    static async efetuarLogin(ra, senha) {
        //parametros a serem passados - ra: number / senha: string
        let res = true;
        console.log(ra + " " + senha);
        await Sql.conectar(async (sql) => {
            let hash = await sql.query("select senha_usuario from usuario where ra_usuario = ?", [ra]);
            if (hash.length == 0) {
                res = false;
            }
            else if (!(await GeradorHash.validarSenha(senha, hash[0].senha_usuario))) {
                res = false;
            }
        });
        return res;
    }
};
//# sourceMappingURL=Usuario.js.map