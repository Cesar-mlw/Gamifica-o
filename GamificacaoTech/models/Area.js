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
module.exports = class Area {
    static validate(a) {
        let resp;
        if (a.nome_area == null)
            resp = "Nome da área não poder ser nulo";
        return resp;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("select * from area"));
            }));
            return lista;
        });
    }
    static create(a) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if ((res = Area.validate(a)))
                return res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield sql.query("INSERT INTO area (nome_area) values (?)", [a.nome_area]);
                }
                catch (e) {
                    if (e.code && e.code === "ER_DUP_ENTRY")
                        res = `O ID ${a.id_area} já está em uso`;
                    else
                        throw e;
                }
            }));
            return res;
        });
    }
    static update(a) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if ((res = Area.validate(a)))
                return res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE area SET nome_area = ? WHERE id_area = ?", [a.nome_area, a.id_area]);
                if (!sql.linhasAfetadas)
                    res = "Usuario Inexistente";
            }));
            return res;
        });
    }
    static read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT id_area, nome_area FROM area WHERE id_area = ?", [id]));
            }));
            return ((lista && lista[0]) || null);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM area WHERE id_area = ?", [id]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=Area.js.map