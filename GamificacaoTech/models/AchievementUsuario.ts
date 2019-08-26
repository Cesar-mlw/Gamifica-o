import Sql = require("../infra/sql")

export = class AchievementUsuario {

    public id_achievement_usuario: number;
    public id_achievement: number;
    public ra_usuario: number;
    public dt_achievement: number;


    public static validate(a: AchievementUsuario): string {
        let resp: string
        if(a.id_achievement == null)
            resp = "ID do achievement não pode ser nulo\n"
        if(a.ra_usuario == null)
            resp += "RA do usuário não pode ser nulo"
        if(a.dt_achievement == null)
            resp += "data do achievement não pode ser nulo"
        return resp
    }

    public static async list(): Promise<AchievementUsuario[]> {
        let lista: AchievementUsuario[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement from achievement a, achievement_usuario u where a.id_achievement = u.id_achievement") as AchievementUsuario[]
        })

        return lista
    }

    public static async create(a: AchievementUsuario): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("insert into achievement_usuario (id_achievement, ra_usuario, dt_achievement) values (?, ?, ?)", [a.id_achievement, a.ra_usuario, a.dt_achievement])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async readFromUserID(ra: number): Promise<AchievementUsuario[]> {
        let lista: AchievementUsuario[] = null

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement, r.nome_area from achievement a, achievement_usuario u, area r where ra_usuario = ? and a.id_achievement = u.id_achievement and a.id_area = r.id_area", [ra]) as AchievementUsuario[]
        })

        return lista
    }
    
    public static async read(id: number): Promise<AchievementUsuario[]> {
        let lista: AchievementUsuario[] = null

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select u.id_achievement_usuario, u.ra_usuario, u.dt_achievement, a.id_achievement, a.nome_achievement, a.descricao_achievement, r.nome_area from achievement a, achievement_usuario u, area r where id_achievement_usuario = ? and a.id_achievement = u.id_achievement and a.id_area = r.id_area", [id]) as AchievementUsuario[]
        })

        return lista
    }

    public static async update(a: AchievementUsuario): Promise<string> {
        let res: string;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE achievement_usuario SET id_achievement = ?, dt_achievement = ? WHERE id_achievement_usuario = ?", [a.id_achievement, a.dt_achievement, a.id_achievement_usuario])
            if(!sql.linhasAfetadas)
                res = "Usuário não possui esse achievement"
        })

        return res
    }

    public static async delete(id: number): Promise<boolean> {
        let res: boolean = true

        Sql.conectar(async (sql:Sql) => {
            await sql.query("DELETE FROM achievement_usuario WHERE id_achievement_usuario = ?", [id])
            if(!sql.linhasAfetadas)
                res = false
        })

        return res
    }



}