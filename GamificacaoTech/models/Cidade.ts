import Sql = require("../infra/sql")

export = class Cidade {

    public id_cidade: number;
    public nome_cidade: string;
    public id_estado_cidade: number;
    
    
    public static validate(c: Cidade): string {
        let resp: string;
        if(c.nome_cidade == null)
            resp = "Nome da cidade não poder ser nulo "
        if(c.id_estado_cidade == null)
            resp = "ID do estado não pode ser nulo "
        return resp
    }

    public static async list(): Promise<Cidade[]> {
        let lista: Cidade[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT c.id_cidade, c.nome_cidade, c.id_estado_cidade, e.nome_estado FROM cidade c, estado e WHERE c.id_estado_cidade = e.id_estado") as Cidade[]
        })
        return lista
    }

    public static async create(c: Cidade): Promise<string>{
        let res: string;
        if((res = Cidade.validate(c)))
            throw res
        
        await Sql.conectar(async (sql: Sql) => {
            try {
                sql.query("INSERT INTO cidade (nome_cidade, id_estado_cidade) VALUES (?, ?)", [c.nome_cidade, c.id_estado_cidade])
            } catch(e) {
                if(e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${c.id_cidade} já está em uso`
                else
                    throw e
            }

        })
        return res
    } 

    public static async read(id: number): Promise<Cidade> {
        let lista: Cidade[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT c.id_cidade, c.nome_cidade, c.id_estado_cidade, e.nome_estado FROM cidade c, estado e WHERE id_cidade = ?", [id]) 
        })

        return ((lista && lista[0]) || null)
    }

    public static async update(c: Cidade): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql:Sql) => {
            await sql.query("UPDATE cidade SET nome_cidade = ?, id_estado_cidade = ? WHERE id_cidade = ?", [c.nome_cidade, c.id_estado_cidade, c.id_cidade])
            if(!sql.linhasAfetadas)
                res = "Cidade não encontrada"
        })

        return res
    }

    public static async delete(id_item: number): Promise<boolean> {
        let res: boolean = true;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM cidade WHERE id_cidade = ?", [id_item])
            if(!sql.linhasAfetadas)
                res = false
        })
        
        return res
    }


}