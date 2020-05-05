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
module.exports = class TituloLink {
    static validate(t) {
        let res;
        if (t.nome_titulo_link == null)
            res = "O nome do título do link não pode ser nulo ";
        return res;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT id_titulo_link, nome_titulo_link FROM titulo_link"));
            }));
            return lista;
        });
    }
    static create(t) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield sql.query("INSERT INTO titulo_link (nome_titulo_link) VALUES (?)", [t.nome_titulo_link]);
                }
                catch (e) {
                    if (e.code && e.code === "ER_DUP_ENTRY")
                        res = `O ID ${t.id_titulo_link} já está em uso`;
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
                lista = (yield sql.query("SELECT id_titulo_link, nome_titulo_link FROM titulo_link WHERE id_titulo_link = ?", [id]));
            }));
            return lista;
        });
    }
    static update(t) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE titulo_link SET nome_titulo_link = ? WHERE id_titulo_link = ?", [t.nome_titulo_link, t.id_titulo_link]);
                if (!sql.linhasAfetadas)
                    res = "Titulo do link não existe";
            }));
            return res;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM titulo_link WHERE id_titulo_link = ?", [id]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=TituloLinks.js.map