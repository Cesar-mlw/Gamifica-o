import Sql = require("../infra/sql")


export = class TituloLink {

    public id_titulo_link: number;
    public nome_titulo_link: string;




    public static validate(t: TituloLink): string {
        let res: string
        if(t.nome_titulo_link == null)
            res = "O nome do título do link não pode ser nulo "
        return res
    }

    public static async list(): Promise<TituloLink[]> {
        let lista: TituloLink[] = null

        await Sql.conectar(async (sql:Sql) => {
            lista = await sql.query("SELECT id_titulo_link, nome_titulo_link FROM titulo_link") as TituloLink[]
        })

        return lista
    }

    public static async create(t: TituloLink): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("INSERT INTO titulo_link (nome_titulo_link) VALUES (?)", [t.nome_titulo_link])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${t.id_titulo_link} já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async read(id: number): Promise<TituloLink[]> {
        let lista: TituloLink[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_titulo_link, nome_titulo_link FROM titulo_link WHERE id_titulo_link = ?", [id]) as TituloLink[]
        })
        return lista
    }

    public static async update(t: TituloLink): Promise<string> {
        let res: string;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE titulo_link SET nome_titulo_link = ? WHERE id_titulo_link = ?", [t.nome_titulo_link, t.id_titulo_link])
            if(!sql.linhasAfetadas)
                res = "Titulo do link não existe"
        })

        return res
    }

    public static async delete(id: number): Promise<boolean> {
        let res: boolean = true

        Sql.conectar(async (sql:Sql) => {
            await sql.query("DELETE FROM titulo_link WHERE id_titulo_link = ?", [id])
            if(!sql.linhasAfetadas)
                res = false
        })

        return res
    }


}