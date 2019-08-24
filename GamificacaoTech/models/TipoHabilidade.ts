import Sql = require("../infra/sql")



export = class TipoHabilidade {

    public id_tipo_habilidade: number;
    public nome_tipo_habilidade: string;
   
    public static validate(t: TipoHabilidade): string {
        let resp: string;
        if(t.nome_tipo_habilidade == null)
            resp = "nome do tipo da habilidade não pode ser nulo\n"
        return resp
    }

    public static async list(): Promise<TipoHabilidade[]> {
        let lista: TipoHabilidade[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_tipo_habilidade, nome_tipo_habilidade FROM tipo_habilidade") as TipoHabilidade[]
        })
        return lista
    }

    public static async create(t: TipoHabilidade): Promise<string>{
        let res: string;
        if((res = TipoHabilidade.validate(t)))
            throw res
        
        await Sql.conectar(async (sql: Sql) => {
            try {
                sql.query("INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES (?)", [t.nome_tipo_habilidade])
            } catch(e) {
                if(e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${t.id_tipo_habilidade} já está em uso`
                else
                    throw e
            }

        })
        return res
    } 

    public static async read(id: number): Promise<TipoHabilidade> {
        let lista: TipoHabilidade[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            await sql.query("SELECT id_tipo_habilidade, nome_tipo_habilidade FROM tipo_habilidade WHERE id_tipo_habilidade = ?", [id])
        })

        return ((lista && lista[0]) || null)
    }

    public static async update(t:TipoHabilidade): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql:Sql) => {
            await sql.query("UPDATE tipo_habilidade SET nome_tipo_habilidade = ? WHERE id_tipo_habilidade = ?", [t.nome_tipo_habilidade, t.id_tipo_habilidade])
            if(!sql.linhasAfetadas)
                res = "Tipo de habilidade não encontrado"
        })

        return res
    }

    public static async delete(id_tipo_habilidade: number): Promise<boolean> {
        let res: boolean = true;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM tipo_habilidade WHERE id_tipo_habilidade = ?", [id_tipo_habilidade])
            if(!sql.linhasAfetadas)
                res = false
        })
        
        return res
    }


}