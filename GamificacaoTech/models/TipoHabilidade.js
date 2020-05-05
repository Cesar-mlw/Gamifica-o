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
module.exports = class TipoHabilidade {
    static validate(t) {
        let resp;
        if (t.nome_tipo_habilidade == null)
            resp = "nome do tipo da habilidade não pode ser nulo\n";
        return resp;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT id_tipo_habilidade, nome_tipo_habilidade FROM tipo_habilidade"));
            }));
            return lista;
        });
    }
    static create(t) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if ((res = TipoHabilidade.validate(t)))
                throw res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    sql.query("INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES (?)", [t.nome_tipo_habilidade]);
                }
                catch (e) {
                    if (e.code && e.code == "ER_DUP_ENTRY")
                        res = `O ID ${t.id_tipo_habilidade} já está em uso`;
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
                lista = yield sql.query("SELECT id_tipo_habilidade, nome_tipo_habilidade FROM tipo_habilidade WHERE id_tipo_habilidade = ?", [id]);
            }));
            return ((lista && lista[0]) || null);
        });
    }
    static update(t) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE tipo_habilidade SET nome_tipo_habilidade = ? WHERE id_tipo_habilidade = ?", [t.nome_tipo_habilidade, t.id_tipo_habilidade]);
                if (!sql.linhasAfetadas)
                    res = "Tipo de habilidade não encontrado";
            }));
            return res;
        });
    }
    static delete(id_tipo_habilidade) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM tipo_habilidade WHERE id_tipo_habilidade = ?", [id_tipo_habilidade]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=TipoHabilidade.js.map