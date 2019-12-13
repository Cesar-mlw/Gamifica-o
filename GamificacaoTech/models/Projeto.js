"use strict";
const Sql = require("../infra/sql");
const Usuario = require("./Usuario");
module.exports = class Projeto {
    static validate(p) {
        let resp;
        if (p.id_tipo_projeto == null)
            resp += "ID do tipo do projeto não está presente\n";
        if (p.ra_usuario == null)
            resp += "RA do usuário não está presente\n";
        if (p.id_area == null)
            resp += "ID da área não está presente\n";
        if (p.dt_comeco_projeto == null)
            resp += "Data do começo do projeto não está presente";
        if (p.terminado_projeto == null)
            resp += "Indicador do término do projeto não está presente";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = (await sql.query("select p.nome_projeto, p.descricao_projeto, p.terminado_projeto, p.dt_comeco_projeto, p.ra_usuario, p.id_tipo_projeto, t.nome_tipo_projeto, t.pontos_tipo_projeto, a.nome_area, p.id_area, dt_termino_projeto from projeto p, tipo_projeto t, area a where t.id_tipo_projeto = p.id_tipo_projeto and a.id_area = p.id_area"));
        });
        return lista;
    }
    static async create(p) {
        let res;
        console.log(p);
        if ((res = Projeto.validate(p)))
            return res;
        console.log(p);
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("insert into projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) values (?, ?, ?, ?, ?, ?, ?, ?)", [
                    p.id_tipo_projeto,
                    p.ra_usuario,
                    p.id_area,
                    p.dt_comeco_projeto,
                    p.terminado_projeto,
                    p.nome_projeto,
                    p.descricao_projeto,
                    p.dt_termino_projeto
                ]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${p.id_projeto.toString()} já está em uso`;
                else
                    throw e;
            }
        });
        await Usuario.addCoins(50, p.ra_usuario);
        return res;
    }
    static async read(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = (await sql.query("select p.nome_projeto, p.descricao_projeto, p.terminado_projeto, p.dt_comeco_projeto, p.ra_usuario, p.id_tipo_projeto, t.nome_tipo_projeto, t.pontos_tipo_projeto, a.nome_area, p.id_area, p.dt_termino_projeto from projeto p, tipo_projeto t, area a where t.id_tipo_projeto = p.id_tipo_projeto and a.id_area = p.id_area and p.ra_usuario = ?", [ra]));
        });
        return (lista && lista[0]) || null;
    }
    static async readTipoProjetoCounts(ra) {
        let res;
        await Sql.conectar(async (sql) => {
            res = await sql.query("select t.nome_tipo_projeto, count(p.id_tipo_projeto) as count_tipo_projeto from projeto p, tipo_projeto t where ra_usuario = ? and p.id_tipo_projeto = t.id_tipo_projeto group by t.id_tipo_projeto;", [ra]);
        });
        return res;
    }
    static async update(p) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("update projeto set id_tipo_projeto = ?, nome_projeto = ?, id_area = ?, dt_termino_projeto = ?, descricao_projeto = ?, dt_comeco_projeto = ?, terminado_projeto = ? where ra_usuario = ?", [
                p.id_tipo_projeto,
                p.nome_projeto,
                p.id_area,
                p.dt_termino_projeto,
                p.descricao_projeto,
                p.dt_comeco_projeto,
                p.terminado_projeto,
                p.ra_usuario
            ]);
            if (!sql.linhasAfetadas)
                res = "Usuário não possui projetos registrados em seu nome";
        });
        return res;
    }
    static async delete(idProjeto) {
        let res = true;
        await Sql.conectar(async (sql) => {
            await sql.query("delete from projeto where id_projeto = ?", [idProjeto]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Projeto.js.map