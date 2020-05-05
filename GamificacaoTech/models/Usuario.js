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
const GeradorHash = require("../utils/geradorHash");
module.exports = class Usuario {
    static validate(u) {
        let resp;
        if (u.ra_usuario == null)
            resp = "RA não pode ser nulo\n";
        if (u.id_curso == null)
            resp += "ID do curso não pode ser nulo\n";
        if (u.nome_usuario == null)
            resp += "Nome do usuário não pode ser nulo";
        if (u.email_usuario == null)
            resp += "E-mail do usuário não pode ser nulo";
        if (u.nome_usuario == null)
            resp += "Nome do usuário não pode ser nulo";
        if (u.nome_usuario == null)
            resp += "Nome do usuário não pode ser nulo";
        if (u.isAdmin == null)
            resp += "Hierarquia não pode ser nulo";
        return resp;
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("SELECT u.ra_usuario, u.id_curso, u.nome_usuario, u.email_usuario, u.moedas_usuario, u.dt_entrada_usuario, u.senha_usuario, c.nome_curso FROM usuario u, curso c WHERE c.id_curso = u.id_curso"));
            }));
            return lista;
        });
    }
    static create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            u.senha_usuario = yield GeradorHash.criarHash(u.senha_usuario);
            if ((res = Usuario.validate(u)))
                return res;
            u.moedas_usuario = 0;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield sql.query("INSERT INTO usuario (ra_usuario, id_curso, nome_usuario, email_usuario, moedas_usuario, dt_entrada_usuario, senha_usuario, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
                        u.ra_usuario,
                        u.id_curso,
                        u.nome_usuario,
                        u.email_usuario,
                        u.moedas_usuario,
                        u.dt_entrada_usuario,
                        u.senha_usuario,
                        u.isAdmin
                    ]);
                }
                catch (e) {
                    if (e.code && e.code === "ER_DUP_ENTRY")
                        res = `O RA ${u.ra_usuario.toString()} já está em uso`;
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
                lista = (yield sql.query("select u.ra_usuario, u.id_curso, u.nome_usuario, u.moedas_usuario, u.email_usuario, u.dt_entrada_usuario, c.nome_curso, u.isAdmin from usuario u, curso c where ra_usuario = ? and u.id_curso = c.id_curso", [id]));
            }));
            return (lista && lista[0]) || null;
        });
    }
    static readUserPoints(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("select p.id_area, a.nome_area, sum(t.pontos_tipo_projeto) as 'pontos' from projeto p, tipo_projeto t, area a where p.id_tipo_projeto = t.id_tipo_projeto and p.id_area = a.id_area and ra_usuario = ? group by p.id_area order by p.id_area", [ra]));
            }));
            return lista;
        });
    }
    static readUserGeneralPoints(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let lista = null;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                lista = (yield sql.query("select p.ra_usuario, sum(t.pontos_tipo_projeto) as 'pontos' from projeto p, tipo_projeto t, area a where p.id_tipo_projeto = t.id_tipo_projeto and p.id_area = a.id_area and ra_usuario = ? group by p.ra_usuario", [ra]));
            }));
            return lista;
        });
    }
    static update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE usuario SET id_curso = ?, nome_usuario = ?, email_usuario = ?, moedas_usuario = ?, dt_entrada_usuario = ? WHERE ra_usuario = ?", [
                    u.id_curso,
                    u.nome_usuario,
                    u.email_usuario,
                    u.moedas_usuario,
                    u.dt_entrada_usuario,
                    u.ra_usuario,
                    u.isAdmin
                ]);
                if (!sql.linhasAfetadas)
                    res = "Usuário Inexistente";
            }));
            return res;
        });
    }
    //public static async checkForAchievements(ra: number): Promise<number[]>{
    // returns list of achievements ids that the user has acess to
    //}
    static updatePassword(id, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE usuario SET senha_usuario = ? WHERE ra_usuario = ?", [
                    pass,
                    id
                ]);
                if (!sql.linhasAfetadas)
                    res = "Usuário Inexistente";
            }));
            return res;
        });
    }
    static updateRA(id, ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE usuario SET ra_usuario = ? WHERE ra_usuario = ?", [
                    ra,
                    id
                ]);
                if (!sql.linhasAfetadas)
                    res = "Usuário Inexistente";
            }));
            return res;
        });
    }
    static delete(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = true;
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("delete from usuario where ra_usuario = ?", [ra]);
                if (!sql.linhasAfetadas)
                    res = false;
            }));
            return res;
        });
    }
    static buyObject(price, ra) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            let user = yield this.read(ra);
            if (user.moedas_usuario <= price)
                res = "Saldo Insuficiente";
            else {
                yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                    yield sql.query("UPDATE usuario SET moedas_usuario = (moedas_usuario - ?) where ra_usuario = ?", [price, ra]);
                    if (!sql.linhasAfetadas)
                        res = "Usuario não existe";
                }));
            }
            return res;
        });
    }
    static addCoins(coins, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            let user = yield this.read(id);
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                yield sql.query("UPDATE usuario SET moedas_usuario = (moedas_usuario + ?) where ra_usuario = ?", [coins, id]);
                if (!sql.linhasAfetadas)
                    res = "Usuário não existente";
            }));
            return res;
        });
    }
    static efetuarLogin(ra, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            //parametros a serem passados - ra: number / senha: string
            let res = true;
            console.log(ra + " " + senha);
            yield Sql.conectar((sql) => __awaiter(this, void 0, void 0, function* () {
                let hash = yield sql.query("select senha_usuario from usuario where ra_usuario = ?", [ra]);
                if (hash.length == 0) {
                    res = false;
                }
                else if (!(yield GeradorHash.validarSenha(senha, hash[0].senha_usuario))) {
                    res = false;
                }
            }));
            return res;
        });
    }
};
//# sourceMappingURL=Usuario.js.map