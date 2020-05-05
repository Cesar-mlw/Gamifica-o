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
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT a.id_achievement, a.id_area, a.nome_achievement, a.descricao_achievement, a.criterio_achievement, a.id_tipo_projeto_achievement FROM achievement a"));
            }));
            return lista;
        });
    }
    static listJoin() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT a.id_achievement, a.id_area, a.nome_achievement, a.descricao_achievement, a.criterio_achievement, a.id_tipo_projeto_achievement, r.nome_area, t.nome_tipo_projeto FROM achievement a, area r, tipo_projeto t where r.id_area = a.id_area and t.id_tipo_projeto = a.id_tipo_projeto_achievement"));
            }));
            return lista;
        });
    }
    static create(a) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if ((res = Achievement.validate(a)))
                return res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield sql.query("INSERT INTO achievement (nome_achievement, descricao_achievement, id_area, criterio_achievement, id_tipo_projeto_achievement) VALUES (?, ?, ?, ?, ?)", [a.nome_achievement, a.descricao_achievement, a.id_area, a.criterio_achievement, a.id_tipo_projeto_achievement]);
                }
                catch (e) {
                    if (e.code && e.code === "ER_DUP_ENTRY")
                        res = `O ID ${a.id_achievement.toString()} já está em uso`;
                    else
                        throw e;
                }
            }));
            return res;
        });
    }
    static read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT a.id_achievement, a.nome_achievement, a.descricao_achievement, a.id_area, r.nome_area FROM achievement a, area r WHERE id_achievement = ? AND r.id_area = a.id_area", [id]));
            }));
            return ((lista && lista[0]) || null);
        });
    }
    static update(a) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE achievement SET nome_achievement = ?, descricao_achievement = ?, id_area = ?, criterio_achievement = ?, id_tipo_projeto_achievement = ? WHERE id_achievement = ?", [a.nome_achievement, a.descricao_achievement, a.id_area, a.criterio_achievement, a.id_tipo_projeto_achievement, a.id_achievement]);
                if (!sql.linhasAfetadas)
                    res = "Achievement Inexistente";
            }));
            return res;
        });
    }
    static delete(idAchievement) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM achievement WHERE id_achievement = ?", [idAchievement]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=Achievement.js.map