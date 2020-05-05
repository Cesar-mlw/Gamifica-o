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
module.exports = class Endereco {
    static validate(e) {
        let resp;
        if (e.logradouro_endereco == null)
            resp = "Nome do Logradouro não pode ser nulo ";
        if (e.numero_endereco == null)
            resp = "Número não pode ser nulo ";
        if (e.id_cidade == null)
            resp = "ID da cidade não deve ser nulo ";
        return resp;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT e.id_endereco, e.logradouro_endereco, e.numero_endereco, e.complemento_endereco, c.nome_cidade, e.id_cidade_endereco FROM Endereco e, Cidade c WHERE e.id_cidade_endereco = c.id_cidade"));
            }));
            return lista;
        });
    }
    static create(e) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if ((res = Endereco.validate(e)))
                throw res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    sql.query("INSERT INTO endereco (logradouro_endereco, numero_endereco, complemento_endereco, id_cidade) VALUES (?, ?, ?, ?)", [e.logradouro_endereco, e.numero_endereco, e.complemento_logradouro, e.id_cidade]);
                }
                catch (e) {
                    if (e.code && e.code == "ER_DUP_ENTRY")
                        res = `O ID ${e.id_endereco} já está em uso`;
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
                lista = yield sql.query("SELECT e.id_endereco, e.logradouro_endereco, e.numero_endereco, e.complemento_endereco, e.id_cidade, c.nome_cidade  FROM endereco e, cidade c WHERE e.id_cidade = c.id_cidade", [id]);
            }));
            return ((lista && lista[0]) || null);
        });
    }
    static update(e) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE endereco SET logradouro_endereco = ?, numero_endereco = ?, complemento_endereco = ?, id_cidade = ? WHERE id_endereco = ?", [e.logradouro_endereco, e.numero_endereco, e.complemento_logradouro, e.id_cidade, e.id_endereco]);
                if (!sql.linhasAfetadas)
                    res = "Curso não encontrado";
            }));
            return res;
        });
    }
    static delete(id_item) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM endereco WHERE id_endereco = ?", [id_item]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=Endereco.js.map