import Sql = require("../infra/sql")

export = class Achievement {

    public id_achievement: number;
    public id_area: number;
    public nome_achievement: string;
    public descricao_achievement: string


    public static validate(a: Achievement): string {
        let resp: string
        if(a.id_area == null)
            resp = "ID da área não pode ser nulo\n "
        if(a.nome_achievement == null)
            resp += " Nome do Achievement não pode ser nulo\n "
        if(a.descricao_achievement == null)
            resp += " Descrição do Achievement não pode ser nulo"
        return resp
    }

    public static async list(): Promise<Achievement[]> {
        let lista: Achievement[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT a.id_achievement, a.nome_achievement, a.descricao_achievement, a.id_area, r.nome_area FROM achievement a, area r WHERE r.id_area = a.id_area") as Achievement[]
        })

        return lista
    }

    public static async create(a: Achievement): Promise<string> {
        let res: string;

        if ((res = Achievement.validate(a)))
            return res

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("INSERT INTO achievement (nome_achievement, descricao_achievement, id_area) VALUES (?, ?, ?)", [a.nome_achievement, a.descricao_achievement, a.id_area])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${a.id_achievement.toString()} já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async read(id: number): Promise<Achievement> {
        let lista: Achievement[] = null

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT a.id_achievement, a.nome_achievement, a.descricao_achievement, a.id_area, r.nome_area FROM achievement a, area r WHERE id_achievement = ? AND r.id_achievement = a.id_achievement", [id]) as Achievement[]
        })

        return ((lista && lista[0]) || null)
    }

    public static async update(a: Achievement): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE achievement SET nome_achievement = ?, descricao_achievement = ?, id_area = ? WHERE id_achievement = ?", [a.nome_achievement, a.descricao_achievement, a.id_area, a.id_achievement])
            if (!sql.linhasAfetadas)
                res = "Achievement Inexistente"
        })

        return res
    }

    public static async delete(idAchievement: number): Promise<boolean> {
        let res: boolean = true;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM achievement WHERE id_achievement = ?", [idAchievement])
            if (!sql.linhasAfetadas)
                res = false
        })

        return res
    }


}