import Sql = require("../infra/sql");
import GeradorHash = require("../utils/geradorHash");
import ItemUsuario = require("./ItemUsuario");
import { isString } from "util";

export = class Usuario {
  public ra_usuario: number;
  public id_curso: string;
  public nome_usuario: string;
  public email_usuario: string;
  public moedas_usuario: number;
  public dt_entrada_usuario: Date;
  public senha_usuario: string;
  public isAdmin: boolean;

  public static validate(u: Usuario): string {
    let resp: string;
    if (u.ra_usuario == null) resp = "RA não pode ser nulo\n";
    if (u.id_curso == null) resp += "ID do curso não pode ser nulo\n";
    if (u.nome_usuario == null) resp += "Nome do usuário não pode ser nulo";
    if (u.email_usuario == null) resp += "E-mail do usuário não pode ser nulo";
    if (u.nome_usuario == null) resp += "Nome do usuário não pode ser nulo";
    if (u.nome_usuario == null) resp += "Nome do usuário não pode ser nulo";
    if (u.isAdmin == null) resp += "Hierarquia não pode ser nulo";
    return resp;
  }

  public static async list(): Promise<Usuario[]> {
    let lista: Usuario[] = null;

    await Sql.conectar(async (sql: Sql) => {
      lista = (await sql.query(
        "SELECT u.ra_usuario, u.id_curso, u.nome_usuario, u.email_usuario, u.moedas_usuario, u.dt_entrada_usuario, u.senha_usuario, c.nome_curso FROM usuario u, curso c WHERE c.id_curso = u.id_curso"
      )) as Usuario[];
    });
    return lista;
  }

  public static async create(u: Usuario): Promise<string> {
    let res: string;
    u.senha_usuario = await GeradorHash.criarHash(u.senha_usuario);
    if ((res = Usuario.validate(u))) return res;
    u.moedas_usuario = 0;
    await Sql.conectar(async (sql: Sql) => {
      try {
        await sql.query(
          "INSERT INTO usuario (ra_usuario, id_curso, nome_usuario, email_usuario, moedas_usuario, dt_entrada_usuario, senha_usuario, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            u.ra_usuario,
            u.id_curso,
            u.nome_usuario,
            u.email_usuario,
            u.moedas_usuario,
            u.dt_entrada_usuario,
            u.senha_usuario,
            u.isAdmin
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
        "select u.ra_usuario, u.id_curso, u.nome_usuario, u.moedas_usuario, u.email_usuario, u.dt_entrada_usuario, c.nome_curso, u.isAdmin from usuario u, curso c where ra_usuario = ? and u.id_curso = c.id_curso",
        [id]
      )) as Usuario[];
    });

    return (lista && lista[0]) || null;
  }

  public static async readUserPoints(ra: number): Promise<number[]>{
    let lista: number[]= null

    await Sql.conectar(async (sql: Sql) => {
        lista = await sql.query("select p.id_area, a.nome_area, sum(t.pontos_tipo_projeto) as 'pontos' from projeto p, tipo_projeto t, area a where p.id_tipo_projeto = t.id_tipo_projeto and p.id_area = a.id_area and ra_usuario = ? group by p.id_area order by p.id_area", [ra]) as number[]
    })

    return lista
}

public static async readUserGeneralPoints(ra: number): Promise<number[]>{
  let lista: number[] = null

  await Sql.conectar(async(sql: Sql) => {
    lista = await sql.query("select p.ra_usuario, sum(t.pontos_tipo_projeto) as 'pontos' from projeto p, tipo_projeto t, area a where p.id_tipo_projeto = t.id_tipo_projeto and p.id_area = a.id_area and ra_usuario = ? group by p.ra_usuario", [ra]) as number[]
  })

  return lista
}

  public static async update(u: Usuario): Promise<string> {
    //
    let res: string;
    await Sql.conectar(async (sql: Sql) => {
      await sql.query(
        "UPDATE usuario SET id_curso = ?, nome_usuario = ?, email_usuario = ?, moedas_usuario = ?, dt_entrada_usuario = ? WHERE ra_usuario = ?",
        [
          u.id_curso,
          u.nome_usuario,
          u.email_usuario,
          u.moedas_usuario,
          u.dt_entrada_usuario,
          u.ra_usuario,
          u.isAdmin
        ]
      );
      if (!sql.linhasAfetadas) res = "Usuário Inexistente";
    });
    return res;
  }

  public static async readUserCoins(id: number): Promise<number> {
    let res: number[]
      await Sql.conectar(async (sql: Sql) => {
        res = await sql.query("SELECT moedas_usuario from USUARIO where ra_usuario = ?", [id])
      })
    return res[0]
  }

  //public static async checkForAchievements(ra: number): Promise<number[]>{
    // returns list of achievements ids that the user has acess to
  //}

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

  public static async buyObject(price: number, ra: number): Promise<string> {
    let res: string;
    let user: Usuario = await this.read(ra);
    if(user.moedas_usuario <= price) 
      res = "Saldo Insuficiente"
    
    else{
      await Sql.conectar(async (sql: Sql) => {
        await sql.query("UPDATE usuario SET moedas_usuario = (moedas_usuario - ?) where ra_usuario = ?", [price, ra]);
        if (!sql.linhasAfetadas) res = "Usuario não existe";
      });
    }


    return res
  }

  public static async addCoins(coins: number, id: number): Promise<string>{
    let res: string;
    let user: Usuario = await this.read(id);
    await Sql.conectar(async (sql: Sql) => {
      await sql.query("UPDATE usuario SET moedas_usuario = (moedas_usuario + ?) where ra_usuario = ?", [coins, id])
      if(!sql.linhasAfetadas) res = "Usuário não existente"
    })
    return res;
  }

  public static async doesNotExist(ra: number): Promise<boolean>{
    let res: boolean = false
    let user = await this.read(ra)
    if (user == null) res = true
    return res
  }

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
