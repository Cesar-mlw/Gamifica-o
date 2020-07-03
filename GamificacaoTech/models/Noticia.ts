import Sql = require("../infra/sql")

export = class Noticia {
    public id_noticia: number;
    public chamada_noticia: string;
    public corpo_noticia: string;
    public imagem_noticia_url: string;
    public data_publicacao: Date;
    public ra_usuario: number;

    public static validate(p: Noticia): string {
        let resp: string
        if(p.chamada_noticia == null)
            resp += "Chamada nao pode ser nula/"
        if(p.corpo_noticia == null)
            resp += "Corpo nao pode ser nulo/"
        if(p.data_publicacao == null)
            resp += "Data nao pode ser nula/"
        if(p.ra_usuario == null)
            resp += "id usuario nao pode ser nulo/"
        return resp
    }

    public static async list(): Promise<Noticia[]> {
        let lista: Noticia[] = null;
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_noticia, chamada_noticia, corpo_noticia, data_publicacao, ra_usuario from noticia order by data_publicacao")
        })
        return lista
    }

    public static async create(n: Noticia): Promise<string>{
        let res: string = Noticia.validate(n);
        if (res) {
            return res;
        }
        
        await Sql.conectar(async (sql: Sql) => {
            try { 
                sql.query("INSERT INTO noticia (chamada_noticia, corpo_noticia, data_publicacao, ra_usuario) VALUES (?, ?, ?, ?)", [
                    n.chamada_noticia,
                    n.corpo_noticia,
                    n.data_publicacao,
                    n.ra_usuario
                ])
            }
            catch (e) {
                if(e.code && e.code == 'ER_DUP_ENTRY')
                    res = `O ID ${n.id_noticia} ja esta em uso`
                else 
                    throw e
            }
        })
        return res
    }

    public static async read(id: number): Promise<Noticia>{
        let lista: Noticia[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_noticia, chamada_notica, corpo_noticia, data_publicacao, ra_usuario WHERE id_noticia = ?", [id])
        })

        return ((lista && lista[0]) || null)
    }

    public static async readFromUserId(ra: number): Promise<Noticia[]>{
        let lista: Noticia[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_noticia, chamada_notica, corpo_noticia, data_publicacao, ra_usuario WHERE ra_usuario = ?", [ra])
        })

        return lista
    }

    public static async readRecentNews(): Promise<Noticia[]>{
        let lista: Noticia[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT chamada_noticia, corpo_noticia, data_publicacao FROM noticia WHERE data_publicacao <= CURDATE() order by data_publicacao;") as Noticia[]
        })

        return lista
    }



    public static async update(n: Noticia): Promise<string> { 
        let res: string

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE noticia SET chamada_noticia = ?, corpo_noticia = ?, data_publicacao = ?, ra_usuario = ?", [
                n.chamada_noticia,
                n.corpo_noticia,
                n.data_publicacao,
                n.ra_usuario
            ])
            if(!sql.linhasAfetadas)
                res = "Cidade nao encontrada"
        })

        return res
    }

    public static async delete(id: number): Promise<boolean> {
        let res: boolean = true

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM noticia WHERE id_noticia = ?", [id])
            if(!sql.linhasAfetadas)
                res = false
        })

        return res
    }
}