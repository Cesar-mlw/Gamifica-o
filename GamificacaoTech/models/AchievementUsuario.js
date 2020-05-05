"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement from achievement a, achievement_usuario u where a.id_achievement = u.id_achievement"));
            }));
            return lista;
        });
    }
    static create(ra, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield sql.query("insert into achievement_usuario (id_achievement, ra_usuario, dt_achievement, destaque_achievement) values (?, ?, NOW(), 0)", [id, ra]);
                }
                catch (e) {
                    if (e.code && e.code === "ER_DUP_ENTRY")
                        res = `já está em uso`;
                    else
                        throw e;
                }
            }));
            return res;
        });
    }
    static readFromUserID(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement, a.criterio_achievement, r.nome_area, a.id_tipo_projeto_achievement, t.nome_tipo_projeto from achievement a, achievement_usuario u, tipo_projeto t, area r where ra_usuario = ? and a.id_achievement = u.id_achievement and a.id_area = r.id_area and t.id_tipo_projeto = a.id_tipo_projeto_achievement", [ra]));
            }));
            return lista;
        });
    }
    static read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement, r.nome_area, a.id_tipo_projeto_achievement, t.nome_tipo_projeto from achievement a, achievement_usuario u, area r, tipo_projeto t where id_achievement_usuario = ? and a.id_achievement = u.id_achievement and a.id_area = r.id_area and t.id_tipo_projeto = a.id_tipo_projeto_achievement", [id]));
            }));
            return lista;
        });
    }
    static readMissingAchievements(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("select a.id_achievement, a.id_area, a.nome_achievement, a.descricao_achievement, a.criterio_achievement, a.id_tipo_projeto_achievement, t.nome_tipo_projeto from achievement a, tipo_projeto t where a.id_achievement not in (SELECT id_achievement FROM achievement_usuario u where u.ra_usuario = ?) and t.id_tipo_projeto = a.id_tipo_projeto_achievement", [ra]));
            }));
            return lista;
        });
    }
    static readFeaturedAchievements(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement, r.nome_area from achievement a, achievement_usuario u, area r where ra_usuario = ? and destaque_achievement = 1 and a.id_achievement = u.id_achievement and a.id_area = r.id_area", [ra]));
            }));
            return lista;
        });
    }
    static update(a) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE achievement_usuario SET id_achievement = ?, dt_achievement = ? WHERE id_achievement_usuario = ?", [a.id_achievement, a.dt_achievement, a.id_achievement_usuario]);
                if (!sql.linhasAfetadas)
                    res = "Usuário não possui esse achievement";
            }));
            return res;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM achievement_usuario WHERE id_achievement_usuario = ?", [id]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=AchievementUsuario.js.map