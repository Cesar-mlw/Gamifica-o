import Sql = require("../infra/sql")

export = class Endereco {

    public id_endereco: number;
    public logradouro_endereco: string;
    public numero_endereco: number;
    public complemento_logradouro: string;
    public id_cidade: number;
    
    public static validate(e: Endereco): string {
        let resp: string;
        if(e.logradouro_endereco == null)
            resp = "Nome do Logradouro não pode ser nulo "
        if(e.numero_endereco == null)
            resp = "Número não pode ser nulo "
        if(e.id_cidade == null)
            resp = "ID da cidade não deve ser nulo "
        return resp
    }

    public static async list(): Promise<Endereco[]> {
        let lista: Endereco[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT e.id_endereco, e.logradouro_endereco, e.numero_endereco, e.complemento_endereco, c.nome_cidade, e.id_cidade FROM Endereco e, Cidade c WHERE e.id_cidade = c.id_cidade") as Endereco[]
        })
        return lista
    }

    public static async create(e: Endereco): Promise<string>{
        let res: string;
        if((res = Endereco.validate(e)))
            throw res
        
        await Sql.conectar(async (sql: Sql) => {
            try {
                sql.query("INSERT INTO endereco (logradouro_endereco, numero_endereco, complemento_endereco, id_cidade) VALUES (?, ?, ?, ?)", [e.logradouro_endereco, e.numero_endereco, e.complemento_logradouro, e.id_cidade])
            } catch(e) {
                if(e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${e.id_endereco} já está em uso`
                else
                    throw e
            }

        })
        return res
    } 

    public static async read(id: number): Promise<Endereco> {
        let lista: Endereco[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT e.id_endereco, e.logradouro_endereco, e.numero_endereco, e.complemento_endereco, e.id_cidade, c.nome_cidade  FROM endereco e, cidade c WHERE e.id_cidade = c.id_cidade", [id]) 
        })

        return ((lista && lista[0]) || null)
    }

    public static async update(e:Endereco): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql:Sql) => {
            await sql.query("UPDATE endereco SET logradouro_endereco = ?, numero_endereco = ?, complemento_endereco = ?, id_cidade = ? WHERE id_endereco = ?", [e.logradouro_endereco, e.numero_endereco, e.complemento_logradouro, e.id_cidade, e.id_endereco])
            if(!sql.linhasAfetadas)
                res = "Curso não encontrado"
        })

        return res
    }

    public static async delete(id_item: number): Promise<boolean> {
        let res: boolean = true;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM endereco WHERE id_endereco = ?", [id_item])
            if(!sql.linhasAfetadas)
                res = false
        })
        
        return res
    }


}