"use strict";
const Sql = require("../infra/sql");
module.exports = class AchievementUsuario {
    static validate(a) {
        let resp;
        if (a.id_achievement == null)
            resp = "ID do achievement não pode ser nulo\n";
        if (a.ra_usuario == null)
            resp += "RA do usuário não pode ser nulo";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement from achievement a, achievement_usuario u where a.id_achievement = u.id_achievement");
        });
        return lista;
    }
    static async create(ra, id) {
        let res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("insert into achievement_usuario (id_achievement, ra_usuario, dt_achievement, destaque_achievement) values (?, ?, NOW(), 0)", [id, ra]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async readFromUserID(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement, a.criterio_achievement, r.nome_area from achievement a, achievement_usuario u, area r where ra_usuario = ? and a.id_achievement = u.id_achievement and a.id_area = r.id_area", [ra]);
        });
        return lista;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement, r.nome_area from achievement a, achievement_usuario u, area r where id_achievement_usuario = ? and a.id_achievement = u.id_achievement and a.id_area = r.id_area", [id]);
        });
        return lista;
    }
    static async readMissingAchievements(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select a.id_achievement, a.id_area, a.nome_achievement, a.descricao_achievement, a.criterio_achievement, a.id_tipo_projeto_achievement from achievement a where a.id_achievement not in (SELECT id_achievement FROM achievement_usuario u where u.ra_usuario = ?)", [ra]);
        });
        return lista;
    }
    static async readFeaturedAchievements(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement, r.nome_area from achievement a, achievement_usuario u, area r where ra_usuario = ? and destaque_achievement = 1 and a.id_achievement = u.id_achievement and a.id_area = r.id_area", [ra]);
        });
        return lista;
    }
    static async update(a) {
        let res;
        Sql.conectar(async (sql) => {
            await sql.query("UPDATE achievement_usuario SET id_achievement = ?, dt_achievement = ? WHERE id_achievement_usuario = ?", [a.id_achievement, a.dt_achievement, a.id_achievement_usuario]);
            if (!sql.linhasAfetadas)
                res = "Usuário não possui esse achievement";
        });
        return res;
    }
    static async delete(id) {
        let res = true;
        Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM achievement_usuario WHERE id_achievement_usuario = ?", [id]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=AchievementUsuario.js.map