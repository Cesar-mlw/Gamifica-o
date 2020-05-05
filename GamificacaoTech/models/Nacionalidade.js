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
module.exports = class Nacionalidade {
    static validate(n) {
        let resp;
        if (n.nome_nacionalidade == null)
            resp = "Nome da nacionalidade não pode ser nulo ";
        return resp;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT id_nacionalidade, nome_nacionalidade FROM nacionalidade"));
            }));
            return lista;
        });
    }
    static create(n) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if ((res = Nacionalidade.validate(n)))
                throw res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    sql.query("INSERT INTO nacionalidade (nome_nacionalidade) VALUES (?)", [n.nome_nacionalidade]);
                }
                catch (e) {
                    if (e.code && e.code == "ER_DUP_ENTRY")
                        res = `O ID ${n.id_nacionalidade} já está em uso`;
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
                lista = yield sql.query("SELECT id_nacionalidade, nome_nacionalidade FROM nacionalidade WHERE id_nacionalidade = ?", [id]);
            }));
            return ((lista && lista[0]) || null);
        });
    }
    static update(n) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE nacionalidade SET nome_nacionalidade = ? WHERE id_nacionalidade = ?", [n.nome_nacionalidade, n.id_nacionalidade]);
                if (!sql.linhasAfetadas)
                    res = "Nacionalidade não encontrada";
            }));
            return res;
        });
    }
    static delete(id_item) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM nacionalidade WHERE id_nacionalidade = ?", [id_item]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=Nacionalidade.js.map