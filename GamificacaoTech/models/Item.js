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
module.exports = class Item {
    static validate(i) {
        let resp;
        if (i.img_url_item == null)
            resp = "URL da imagem não pode ser nulo\n";
        if (i.nome_item == null)
            resp = "Nome do item não pode ser nulo\n";
        if (i.id_area == null)
            resp = "Id da área não pode ser nulo";
        return resp;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT i.id_item, i.nome_item, i.img_url_item, i.preco_item, i.id_area, a.nome_area FROM item i, area a where i.id_area = a.id_area"));
            }));
            return lista;
        });
    }
    static create(i) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if ((res = Item.validate(i)))
                throw res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    sql.query("INSERT INTO item (nome_item, img_url_item, preco_item, id_area) VALUES (?, ?, ?)", [i.nome_item, i.img_url_item, i.preco_item, i.id_area]);
                }
                catch (e) {
                    if (e.code && e.code == "ER_DUP_ENTRY")
                        res = `O ID ${i.id_item} já está em uso`;
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
                lista = yield sql.query("SELECT i.id_item, i.nome_item, i.img_url_item, i.preco_item, i.id_area, a.nome_area FROM item i, area a WHERE id_item = ? AND i.id_item = a.id_area", [id]);
            }));
            return ((lista && lista[0]) || null);
        });
    }
    static update(i) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE item SET nome_item = ?, img_url_item = ?, preco_item = ?, id_area = ? where id_item = ?", [i.nome_item, i.img_url_item, i.preco_item, i.id_item, i.id_area]);
                if (!sql.linhasAfetadas)
                    res = "Item não existente";
            }));
            return res;
        });
    }
    static delete(id_item) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM item WHERE id_item = ?", [id_item]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=Item.js.map