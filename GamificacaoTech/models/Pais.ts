import Sql = require("../infra/sql")

export = class Pais {

    public id_pais: number;
    public nome_pais: string;
    
    
    public static validate(p: Pais): string {
        let resp: string;
        if(p.nome_pais == null)
            resp = "Nome do pais não pode ser nulo"
        return resp
    }

    public static async list(): Promise<Pais[]> {
        let lista: Pais[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_pais, nome_pais FROM pais") as Pais[]
        })
        return lista
    }

    public static async create(p: Pais): Promise<string>{
        let res: string;
        if((res = Pais.validate(p)))
            throw res
        
        await Sql.conectar(async (sql: Sql) => {
            try {
                sql.query("INSERT INTO pais (nome_pais) VALUES (?)", [p.nome_pais])
            } catch(e) {
                if(e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${p.id_pais} já está em uso`
                else
                    throw e
            }

        })
        return res
    } 

    public static async read(id: number): Promise<Pais> {
        let lista: Pais[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_pais, nome_pais FROM pais WHERE id_pais = ?", [id]) 
        })

        return ((lista && lista[0]) || null)
    }

    public static async update(p: Pais): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql:Sql) => {
            await sql.query("UPDATE pais SET nome_pais = ? WHERE id_pais = ?", [p.id_pais])
            if(!sql.linhasAfetadas)
                res = "Cidade não encontrada"
        })

        return res
    }

    public static async delete(id_item: number): Promise<boolean> {
        let res: boolean = true;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM pais WHERE id_pais = ?", [id_item])
            if(!sql.linhasAfetadas)
                res = false
        })
        
        return res
    }


}