import Sql = require("../infra/sql");


export = class Area {

    public id_area: number;
    public nome_area: string;


    public static validate(a: Area): string {
        let resp:string;
        if(a.id_area == null || a.nome_area == null) resp = "ERRO"
        return resp
    }

    public static async list(): Promise<Area[]> {
        let lista: Area[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from area") as Area[]
        })
        return lista
    }


    public static async create(a: Area): Promise<string> {
        let res: string;

        if ((res = Area.validate(a)))
            return res

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("INSERT INTO area (nome_area) values (?)", [a.nome_area])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${a.id_area} já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async update(a: Area): Promise<string> {
        let res: string;

        if((res = Area.validate(a)))
            return res
        
        await Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE area SET nome_area = ? WHERE id_area = ?", [a.nome_area, a.id_area])
            if(!sql.linhasAfetadas)
                res = "Usuario Inexistente"
        })

        return res
    }

    public static async read(id: number): Promise<Area> {
        let lista: Area[] = null

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_area, nome_area FROM area WHERE id_area = ?", [id]) as Area[]
        })

        return ((lista && lista[0]) || null)
    }

    public static async delete(id: number): Promise<boolean>{
        let res: boolean = true;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE area WHERE id_area = ?", [id])
            if(!sql.linhasAfetadas)
                res = false;
        })

        return res
    }

}