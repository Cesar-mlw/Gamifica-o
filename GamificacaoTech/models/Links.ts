import Sql = require("../infra/sql")


export = class Links {

    public id_link: number;
    public titulo_link: number;
    public txt_link: string;
    public ra_usuario: number;




    public static validate(l: Links): string {
        let res: string
        if(l.ra_usuario == null)
            res = "O RA do usuário não pode ser nulo "
        if(l.titulo_link == null)
            res = "O id do título do link não pode ser nulo "
        if(l.txt_link == null)
            res = "O texto do link não pode ser nulo "
        return res
    }

    public static async list(): Promise<Links[]> {
        let lista: Links[] = null

        await Sql.conectar(async (sql:Sql) => {
            lista = await sql.query("SELECT l.id_link, l.titulo_link, t.nome_titulo_link, l.txt_link, l.ra_usuario FROM links l, titulo_link t WHERE l.titulo_link = t.id_titulo_link") as Links[]
        })

        return lista
    }

    public static async create(l: Links): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("INSERT INTO links (titulo_link, txt_link, ra_usuario) VALUES (?, ?, ?)", [l.titulo_link, l.txt_link, l.ra_usuario])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${l.id_link} já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async read(ra: number): Promise<Links[]> {
        let lista: Links[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT l.id_link, t.nome_titulo_link, l.titulo_link, l.txt_link, l.ra_usuario FROM links l, titulo_link t WHERE l.titulo_link = t.id_titulo_link and ra_usuario = ?", [ra]) as Links[]
        })
        return lista
    }

    public static async update(l: Links): Promise<string> {
        let res: string;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE links SET txt_link = ?, titulo_link = ? WHERE ra_usuario = ?", [l.txt_link, l.titulo_link, l.ra_usuario])
            if(!sql.linhasAfetadas)
                res = "Usuário não possui esse Link"
        })

        return res
    }

    public static async delete(id: number): Promise<boolean> {
        let res: boolean = true

        Sql.conectar(async (sql:Sql) => {
            await sql.query("DELETE FROM links WHERE id_link = ?", [id])
            if(!sql.linhasAfetadas)
                res = false
        })

        return res
    }


}