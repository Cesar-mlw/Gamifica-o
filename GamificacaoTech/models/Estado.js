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
module.exports = class Estado {
    static validate(e) {
        let resp;
        if (e.nome_estado == null)
            resp = "Nome do estado não poder ser nulo ";
        if (e.id_pais_estado == null)
            resp = "ID do pais não pode ser nulo ";
        return resp;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT e.id_estado, e.nome_estado, e.id_pais_estado, p.nome_pais FROM estado e, pais p WHERE e.id_pais_estado = p.id_pais"));
            }));
            return lista;
        });
    }
    static create(e) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if ((res = Estado.validate(e)))
                throw res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    sql.query("INSERT INTO estado (nome_estado, id_pais_estado) VALUES (?, ?)", [e.nome_estado, e.id_pais_estado]);
                }
                catch (e) {
                    if (e.code && e.code == "ER_DUP_ENTRY")
                        res = `O ID ${e.id_estado} já está em uso`;
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
                lista = yield sql.query("SELECT e.id_estado, e.nome_estado, e.id_pais_estado, p.nome_pais FROM estado e, pais p WHERE e.id_pais_estado = p.id_pais AND id_estado = ?", [id]);
            }));
            return ((lista && lista[0]) || null);
        });
    }
    static update(e) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE estado SET nome_estado = ?, id_pais_estado = ? WHERE id_estado = ?", [e.nome_estado, e.id_pais_estado, e.id_estado]);
                if (!sql.linhasAfetadas)
                    res = "Estado não encontrado";
            }));
            return res;
        });
    }
    static delete(id_item) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM estado WHERE id_estado = ?", [id_item]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=Estado.js.map