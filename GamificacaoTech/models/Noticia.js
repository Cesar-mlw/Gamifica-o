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
module.exports = class Noticia {
    static validate(p) {
        let resp;
        if (p.chamada_noticia == null)
            resp += "Chamada nao pode ser nula/";
        if (p.corpo_noticia == null)
            resp += "Corpo nao pode ser nulo/";
        if (p.data_publicacao == null)
            resp += "Data nao pode ser nula/";
        if (p.ra_usuario == null)
            resp += "id usuario nao pode ser nulo/";
        return resp;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = yield sql.query("SELECT id_noticia, chamada_noticia, corpo_noticia, data_publicacao, ra_usuario from noticia order by data_publicacao");
            }));
            return lista;
        });
    }
    static create(n) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = Noticia.validate(n);
            if (res) {
                return res;
            }
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    sql.query("INSERT INTO noticia (chamada_noticia, corpo_noticia, data_publicacao, ra_usuario) VALUES (?, ?, ?, ?)", [
                        n.chamada_noticia,
                        n.corpo_noticia,
                        n.data_publicacao,
                        n.ra_usuario
                    ]);
                }
                catch (e) {
                    if (e.code && e.code == 'ER_DUP_ENTRY')
                        res = `O ID ${n.id_noticia} ja esta em uso`;
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
                lista = yield sql.query("SELECT id_noticia, chamada_notica, corpo_noticia, data_publicacao, ra_usuario WHERE id_noticia = ?", [id]);
            }));
            return ((lista && lista[0]) || null);
        });
    }
    static readFromUserId(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = yield sql.query("SELECT id_noticia, chamada_notica, corpo_noticia, data_publicacao, ra_usuario WHERE ra_usuario = ?", [ra]);
            }));
            return lista;
        });
    }
    static readRecentNews() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT chamada_noticia, corpo_noticia, data_publicacao FROM noticia WHERE data_publicacao <= CURDATE() order by data_publicacao;"));
            }));
            return lista;
        });
    }
    static update(n) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE noticia SET chamada_noticia = ?, corpo_noticia = ?, data_publicacao = ?, ra_usuario = ?", [
                    n.chamada_noticia,
                    n.corpo_noticia,
                    n.data_publicacao,
                    n.ra_usuario
                ]);
                if (!sql.linhasAfetadas)
                    res = "Cidade nao encontrada";
            }));
            return res;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM noticia WHERE id_noticia = ?", [id]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=Noticia.js.map