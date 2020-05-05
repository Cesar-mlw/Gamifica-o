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
module.exports = class Cidade {
    static validate(c) {
        let resp;
        if (c.nome_cidade == null)
            resp = "Nome da cidade não poder ser nulo ";
        if (c.id_estado_cidade == null)
            resp = "ID do estado não pode ser nulo ";
        return resp;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT c.id_cidade, c.nome_cidade, c.id_estado_cidade, e.nome_estado FROM cidade c, estado e WHERE c.id_estado_cidade = e.id_estado"));
            }));
            return lista;
        });
    }
    static create(c) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if ((res = Cidade.validate(c)))
                throw res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    sql.query("INSERT INTO cidade (nome_cidade, id_estado_cidade) VALUES (?, ?)", [c.nome_cidade, c.id_estado_cidade]);
                }
                catch (e) {
                    if (e.code && e.code == "ER_DUP_ENTRY")
                        res = `O ID ${c.id_cidade} já está em uso`;
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
                lista = yield sql.query("SELECT c.id_cidade, c.nome_cidade, c.id_estado_cidade, e.nome_estado FROM cidade c, estado e WHERE id_cidade = ?", [id]);
            }));
            return ((lista && lista[0]) || null);
        });
    }
    static update(c) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE cidade SET nome_cidade = ?, id_estado_cidade = ? WHERE id_cidade = ?", [c.nome_cidade, c.id_estado_cidade, c.id_cidade]);
                if (!sql.linhasAfetadas)
                    res = "Cidade não encontrada";
            }));
            return res;
        });
    }
    static delete(id_item) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM cidade WHERE id_cidade = ?", [id_item]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=Cidade.js.map