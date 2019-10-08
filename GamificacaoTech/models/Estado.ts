import Sql = require("../infra/sql")

export = class Estado {

    public id_estado: number;
    public nome_estado: string;
    public id_pais_estado: number;
    
    
    public static validate(e: Estado): string {
        let resp: string;
        if(e.nome_estado == null)
            resp = "Nome do estado não poder ser nulo "
        if(e.id_pais_estado == null)
            resp = "ID do pais não pode ser nulo "
        return resp
    }

    public static async list(): Promise<Estado[]> {
        let lista: Estado[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT e.id_estado, e.nome_estado, e.id_pais_estado, p.nome_pais FROM estado e, pais p WHERE e.id_pais_estado = p.id_pais") as Estado[]
        })
        return lista
    }

    public static async create(e: Estado): Promise<string>{
        let res: string;
        if((res = Estado.validate(e)))
            throw res
        
        await Sql.conectar(async (sql: Sql) => {
            try {
                sql.query("INSERT INTO estado (nome_estado, id_pais_estado) VALUES (?, ?)", [e.nome_estado, e.id_pais_estado])
            } catch(e) {
                if(e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${e.id_estado} já está em uso`
                else
                    throw e
            }

        })
        return res
    } 

    public static async read(id: number): Promise<Estado> {
        let lista: Estado[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT e.id_estado, e.nome_estado, e.id_pais_estado, p.nome_pais FROM estado e, pais p WHERE e.id_pais_estado = p.id_pais AND id_estado = ?", [id]) 
        })

        return ((lista && lista[0]) || null)
    }

    public static async update(e: Estado): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql:Sql) => {
            await sql.query("UPDATE estado SET nome_estado = ?, id_pais_estado = ? WHERE id_estado = ?", [e.nome_estado, e.id_pais_estado, e.id_estado])
            if(!sql.linhasAfetadas)
                res = "Estado não encontrado"
        })

        return res
    }

    public static async delete(id_item: number): Promise<boolean> {
        let res: boolean = true;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM estado WHERE id_estado = ?", [id_item])
            if(!sql.linhasAfetadas)
                res = false
        })
        
        return res
    }


}