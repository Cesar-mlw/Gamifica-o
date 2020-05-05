"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Sql = require("../infra/sql");
module.exports = class Habilidade {
    static validate(h) {
        let res;
        if (h.nome_habilidade == null || h.ra_usuario == null)
            res = "ERRO";
        return res;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("select * from habilidade"));
            }));
            return lista;
        });
    }
    static create(h) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if ((res = Habilidade.validate(h)))
                return res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield sql.query("INSERT INTO habilidade (nome_habilidade, ra_usuario, id_tipo_habilidade) values (?, ?, ?)", [h.nome_habilidade, h.ra_usuario, h.id_tipo_habilidade]);
                }
                catch (e) {
                    if (e.code && e.code == 'ER_DUP_ENTRY')
                        res = `O ID ${h.id_habilidade} já está e uso`;
                    else
                        throw e;
                }
            }));
            return res;
        });
    }
    static update(h) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE habilidade SET nome_habilidade = ?, id_tipo_habilidade = ? WHERE id_habilidade = ?", [h.nome_habilidade, h.id_tipo_habilidade, h.id_habilidade]);
                if (!sql.linhasAfetadas)
                    res = "Habilidade Inexistente";
            }));
            return res;
        });
    }
    static read(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT h.id_habilidade, h.nome_habilidade, h.ra_usuario, t.id_tipo_habilidade, t.nome_tipo_habilidade FROM habilidade h, tipo_habilidade t WHERE t.id_tipo_habilidade = h.id_tipo_habilidade AND ra_usuario = ?", [ra]));
            }));
            return lista;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM habilidade WHERE id_habilidade = ?", [id]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=Habilidade.js.map