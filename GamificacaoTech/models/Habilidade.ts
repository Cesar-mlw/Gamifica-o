import Sql = require("../infra/sql")

export = class Habilidade {

    public id_habilidade: number;
    public nome_habilidade: string;
    public ra_usuario: number;
    public id_tipo_habilidade: number;



    public static validate(h: Habilidade): string {
        let res: string
        if(h.nome_habilidade == null || h.ra_usuario == null) 
            res="ERRO"
        return res
    }

    public static async list(): Promise<Habilidade[]> {
        let lista: Habilidade[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from habilidade") as Habilidade[]
        })
        return lista
    }

    public static async create(h: Habilidade): Promise<string> {
        let res: string

        if((res = Habilidade.validate(h)))
            return res
        
        await Sql.conectar(async (sql: Sql) => {
            try{
                await sql.query("INSERT INTO habilidade (nome_habilidade, ra_usuario, id_tipo_habilidade) values (?, ?, ?)", [h.nome_habilidade, h.ra_usuario, h.id_tipo_habilidade])
            } catch(e) {
                if(e.code && e.code == 'ER_DUP_ENTRY')
                    res = `O ID ${h.id_habilidade} já está e uso`
                else 
                    throw e
            }
        })
        return res
    }

    public static async update(h: Habilidade): Promise<string>{
        let res: string
        
        await Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE habilidade SET nome_habilidade = ?, id_tipo_habilidade = ? WHERE id_habilidade = ?", [h.nome_habilidade, h.id_tipo_habilidade, h.id_habilidade])
            if(!sql.linhasAfetadas)
                res = "Habilidade Inexistente"
        })

        return res
    }

    public static async read(ra: number): Promise<Habilidade[]> {
        let lista: Habilidade[] = null

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT h.id_habilidade, h.nome_habilidade, h.ra_usuario, t.id_tipo_habilidade, t.nome_tipo_habilidade FROM habilidade h, tipo_habilidade t WHERE t.id_tipo_habilidade = h.id_tipo_habilidade AND ra_usuario = ?", [ra]) as Habilidade[]
        })

        return lista
    }

    public static async delete(id: number): Promise<boolean>{
        let res: boolean = true;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM habilidade WHERE id_habilidade = ?", [id])
            if(!sql.linhasAfetadas)
                res = false;
        })

        return res
    }

    


}