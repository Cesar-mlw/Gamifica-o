import Sql = require("../infra/sql")

export = class Nacionalidade {

    public id_nacionalidade: number;
    public nome_nacionalidade: string;
    
    
    public static validate(n: Nacionalidade): string {
        let resp: string;
        if(n.nome_nacionalidade == null)
            resp = "Nome da nacionalidade não pode ser nulo "
        return resp
    }

    public static async list(): Promise<Nacionalidade[]> {
        let lista: Nacionalidade[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_nacionalidade, nome_nacionalidade FROM nacionalidade") as Nacionalidade[]
        })
        return lista
    }

    public static async create(n: Nacionalidade): Promise<string>{
        let res: string;
        if((res = Nacionalidade.validate(n)))
            throw res
        
        await Sql.conectar(async (sql: Sql) => {
            try {
                sql.query("INSERT INTO nacionalidade (nome_nacionalidade) VALUES (?)", [n.nome_nacionalidade])
            } catch(e) {
                if(e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${n.id_nacionalidade} já está em uso`
                else
                    throw e
            }

        })
        return res
    } 

    public static async read(id: number): Promise<Nacionalidade> {
        let lista: Nacionalidade[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_nacionalidade, nome_nacionalidade FROM nacionalidade WHERE id_nacionalidade = ?", [id]) 
        })

        return ((lista && lista[0]) || null)
    }

    public static async update(n: Nacionalidade): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql:Sql) => {
            await sql.query("UPDATE nacionalidade SET nome_nacionalidade = ? WHERE id_nacionalidade = ?", [n.nome_nacionalidade, n.id_nacionalidade])
            if(!sql.linhasAfetadas)
                res = "Nacionalidade não encontrada"
        })

        return res
    }

    public static async delete(id_item: number): Promise<boolean> {
        let res: boolean = true;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM nacionalidade WHERE id_nacionalidade = ?", [id_item])
            if(!sql.linhasAfetadas)
                res = false
        })
        
        return res
    }


}