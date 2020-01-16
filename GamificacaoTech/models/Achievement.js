"use strict";
const Sql = require("../infra/sql");
module.exports = class Achievement {
    static validate(a) {
        let resp;
        if (a.id_area == null)
            resp = "ID da área não pode ser nulo\n ";
        if (a.nome_achievement == null)
            resp += "Nome do Achievement não pode ser nulo\n ";
        if (a.descricao_achievement == null)
            resp += "Descrição do Achievement não pode ser nulo\n";
        if (a.criterio_achievement == null)
            resp += "Critério do Achievement não pode ser nulo\n";
        if (a.id_tipo_projeto_achievement == null)
            resp += "Id do tipo de projeto do achievement não pode ser nulo\n";
        return resp;
    }
    static async list() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT a.id_achievement, a.nome_achievement, a.descricao_achievement, a.criterio_achievement, a.id_tipo_projeto_achievement, p.nome_tipo_projeto,a.id_area, r.nome_area FROM achievement a, area r, tipo_projeto WHERE r.id_area = a.id_area AND p.id_tipo_projeto = a.id_tipo_projeto_achievement");
        });
        return lista;
    }
    static async create(a) {
        let res;
        if ((res = Achievement.validate(a)))
            return res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("INSERT INTO achievement (nome_achievement, descricao_achievement, id_area, criterio_achievement, id_tipo_projeto_achievement) VALUES (?, ?, ?, ?, ?)", [a.nome_achievement, a.descricao_achievement, a.id_area, a.criterio_achievement, a.id_tipo_projeto_achievement]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${a.id_achievement.toString()} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async read(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("SELECT a.id_achievement, a.nome_achievement, a.descricao_achievement, a.id_area, r.nome_area FROM achievement a, area r WHERE id_achievement = ? AND r.id_area = a.id_area", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async update(a) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("UPDATE achievement SET nome_achievement = ?, descricao_achievement = ?, id_area = ?, criterio_achievement = ?, id_tipo_projeto_achievement = ? WHERE id_achievement = ?", [a.nome_achievement, a.descricao_achievement, a.id_area, a.criterio_achievement, a.id_tipo_projeto_achievement, a.id_achievement]);
            if (!sql.linhasAfetadas)
                res = "Achievement Inexistente";
        });
        return res;
    }
    static async delete(idAchievement) {
        let res = true;
        await Sql.conectar(async (sql) => {
            await sql.query("DELETE FROM achievement WHERE id_achievement = ?", [idAchievement]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Achievement.js.map