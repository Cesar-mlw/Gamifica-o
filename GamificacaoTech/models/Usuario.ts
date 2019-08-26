﻿import Sql = require("../infra/sql");
import GeradorHash = require("../utils/geradorHash");

export = class Usuario {
  public ra_usuario: number;
  public id_curso: string;
  public nome_usuario: string;
  public email_usuario: string;
  public pontos_totais: number;
  public dt_entrada_usuario: Date;
  public senha_usuario: string;

  public static validate(u: Usuario): string {
    let resp: string;
    if (u.ra_usuario == null) resp = "RA não pode ser nulo\n";
    if (u.id_curso == null) resp += "ID do curso não pode ser nulo\n";
    if (u.nome_usuario == null) resp += "Nome do usuário não pode ser nulo";
    if (u.email_usuario == null) resp += "E-mail do usuário não pode ser nulo";
    if (u.pontos_totais == null)
      resp += "Pontos totais do usuário não pode ser nulo";
    if (u.nome_usuario == null) resp += "Nome do usuário não pode ser nulo";
    if (u.nome_usuario == null) resp += "Nome do usuário não pode ser nulo";
    return resp;
  }

  public static async list(): Promise<Usuario[]> {
    let lista: Usuario[] = null;

    await Sql.conectar(async (sql: Sql) => {
      lista = (await sql.query(
        "SELECT u.ra_usuario, u.id_curso, u.nome_usuario, u.email_usuario, u.pontos_totais, u.dt_entrada_usuario, u.senha_usuario, c.nome_curso FROM usuario u, curso c WHERE c.id_curso = u.id_curso"
      )) as Usuario[];
    });
    return lista;
  }

  public static async create(u: Usuario): Promise<string> {
    let res: string;
    u.senha_usuario = await GeradorHash.criarHash(u.senha_usuario);
    if ((res = Usuario.validate(u))) return res;

    await Sql.conectar(async (sql: Sql) => {
      try {
        await sql.query(
          "INSERT INTO usuario (ra_usuario, id_curso, nome_usuario, email_usuario, pontos_totais, dt_entrada_usuario, senha_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            u.ra_usuario,
            u.id_curso,
            u.nome_usuario,
            u.email_usuario,
            u.pontos_totais,
            u.dt_entrada_usuario,
            u.senha_usuario
          ]
        );
      } catch (e) {
        if (e.code && e.code === "ER_DUP_ENTRY")
          res = `O RA ${u.ra_usuario.toString()} já está em uso`;
        else throw e;
      }
    });

    return res;
  }

  public static async read(id: number): Promise<Usuario> {
    let lista: Usuario[] = null;

    await Sql.conectar(async (sql: Sql) => {
      lista = (await sql.query(
        "select u.ra_usuario, u.id_curso, u.nome_usuario, u.pontos_totais, u.email_usuario, u.dt_entrada_usuario, c.nome_curso from usuario u, curso c where ra_usuario = ? and u.id_curso = c.id_curso",
        [id]
      )) as Usuario[];
    });

    return (lista && lista[0]) || null;
  }

  public static async update(u: Usuario): Promise<string> {
    //
    let res: string;
    await Sql.conectar(async (sql: Sql) => {
      await sql.query(
        "UPDATE usuario SET id_curso = ?, nome_usuario = ?, email_usuario = ?, pontos_totais = ?, dt_entrada_usuario = ? WHERE ra_usuario = ?",
        [
          u.id_curso,
          u.nome_usuario,
          u.email_usuario,
          u.pontos_totais,
          u.dt_entrada_usuario,
          u.ra_usuario
        ]
      );
      if (!sql.linhasAfetadas) res = "Usuário Inexistente";
    });
    return res;
  }

  public static async updatePassword(id: number, pass: string): Promise<string> {
    let res: string;
    await Sql.conectar(async (sql: Sql) => {
      await sql.query(
        "UPDATE usuario SET senha_usuario = ? WHERE ra_usuario = ?",
        [
          pass,
          id
        ]
      );
      if (!sql.linhasAfetadas) res = "Usuário Inexistente";
    });
    return res;
  }
  
  public static async updateRA(id: number, ra: string): Promise<string> {
    let res: string;
    await Sql.conectar(async (sql: Sql) => {
      await sql.query(
        "UPDATE usuario SET ra_usuario = ? WHERE ra_usuario = ?",
        [
          ra,
          id
        ]
      );
      if (!sql.linhasAfetadas) res = "Usuário Inexistente";
    });
    return res;
  }

  public static async delete(ra: number): Promise<boolean> {
    let res: boolean = true;

    await Sql.conectar(async (sql: Sql) => {
      await sql.query("delete from usuario where ra_usuario = ?", [ra]);
      if (!sql.linhasAfetadas) res = false;
    });

    return res;
  }
  //FAZER FUNÇÃO PARA REDIRECIONAR O USUÁRIO PARA OUTRA TABELA

  public static async efetuarLogin(
    ra: number,
    senha: string
  ): Promise<boolean> {
    //parametros a serem passados - ra: number / senha: string
    let res: boolean = true;
    console.log(ra + " " + senha);
    await Sql.conectar(async (sql: Sql) => {
      let hash = await sql.query(
        "select senha_usuario from usuario where ra_usuario = ?",
        [ra]
      );
      if (hash.length == 0) {
        res = false;
      } else if (
        !(await GeradorHash.validarSenha(senha, hash[0].senha_usuario))
      ) {
        res = false;
      }
    });

    return res;
  }
};