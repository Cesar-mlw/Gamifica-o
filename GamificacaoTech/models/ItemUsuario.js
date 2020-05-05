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
module.exports = class ItemUsuario {
    static validate(i) {
        let res;
        if (i.ra_usuario == null)
            res = "O RA do usuário não pode ser nulo\n";
        if (i.id_item == null)
            res = "O id do item não pode ser nulo\n";
        return res;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT u.id_item_usuario, u.ra_usuario, u.id_item, u.dt_item, i.nome_item, i.img_url_item, u.cellx_item, u.celly_item, u.width, u.height FROM item_usuario u, item i WHERE u.id_item = i.id_item"));
            }));
            return lista;
        });
    }
    static create(i) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield sql.query("INSERT INTO item_usuario (id_item, ra_usuario, dt_item, cellx_item, celly_item, width, height, positioned_item) VALUES (?, ?, NOW(), 0, 0, 2, 2, 0)", [i.id_item, i.ra_usuario]);
                }
                catch (e) {
                    if (e.code && e.code === "ER_DUP_ENTRY")
                        res = `O ID ${i.id_item_usuario} já está em uso`;
                    else
                        throw e;
                }
            }));
            return res;
        });
    }
    static readLastInserted() {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                res = (yield sql.query("SELECT last_inserted_id()"));
            }));
            return res;
        });
    }
    static read(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("select i.id_item, i.nome_item, i.img_url_item, u.dt_item, u.id_item_usuario, u.id_item, u.cellx_item, u.celly_item, u.width, u.height, u.positioned_item from item_usuario u, item i where ra_usuario = ? and u.id_item = i.id_item", [ra]));
            }));
            return lista;
        });
    }
    static readPlacedItems(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT u.id_item_usuario, u.ra_usuario, u.id_item, u.cellx_item, u.celly_item, u.width, u.height, u.positioned_item, i.nome_item, i.img_url_item, i.preco_item FROM item_usuario u, item i WHERE u.ra_usuario = ? AND u.positioned_item = TRUE AND u.id_item = i.id_item", [ra]));
            }));
            return lista;
        });
    }
    static readNotPlacedItems(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT u.id_item_usuario, u.ra_usuario, u.id_item, u.cellx_item, u.celly_item, u.width, u.height, u.positioned_item, i.nome_item, i.img_url_item, i.preco_item FROM item_usuario u, item i WHERE u.ra_usuario = ? AND u.positioned_item = FALSE AND u.id_item = i.id_item", [ra]));
            }));
            return lista;
        });
    }
    static readOccupiedPlaces(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT cellx_item, celly_item FROM item_usuario u WHERE u.ra_usuario = ? AND u.positioned_item = true", [ra]));
            }));
            return lista;
        });
    }
    static readImageStyle(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT u.width, u.height, i.img_url_item FROM item_usuario u, item i WHERE u.ra_usuario = ? AND u.positioned_item = false and u.id_item = i.id_item;", [ra]));
            }));
            return lista;
        });
    }
    static update(i) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE item_usuario SET id_item = ?, dt_item = ?, width = ?, height = ? WHERE id_item_usuario = ?", [i.id_item, i.dt_item, i.width, i.height, i.id_item_usuario]);
                if (!sql.linhasAfetadas)
                    res = "Usuário não possui esse item";
            }));
            return res;
        });
    }
    static placeObject(id_item_usuario, cellx, celly) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE item_usuario SET cellx_item = ?, celly_item = ?, positioned_item = true where id_item_usuario = ?", [cellx, celly, id_item_usuario]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
    static removeObject(id_item_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE item_usuario SET cellx_item = NULL, celly_item = NULL, positioned_item = 0 where id_item_usuario = ?", [id_item_usuario]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
    static readMissingItems(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = yield sql.query("select * from item a where a.id_item not in (SELECT id_item FROM item_usuario u where u.ra_usuario = ?)", [ra]);
            }));
            return lista;
        });
    }
    static readMissingItemsSpecific(ra, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = yield sql.query("select * from item a where a.id_item not in (SELECT id_item FROM item_usuario u where u.ra_usuario = ?) AND id_area = ?;", [ra, id]);
            }));
            return lista;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("DELETE FROM item_usuario WHERE id_item_usuario = ?", [id]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
};
//# sourceMappingURL=ItemUsuario.js.map