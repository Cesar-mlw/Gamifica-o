import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")


export = class TipoProjeto {

    public id_tipo_projeto: number;
    public nome_tipo_projeto: string;
    public pontos_tipo_projeto: number;
   
    public static validate(t: TipoProjeto): string {
        let resp: string;
        if(t.nome_tipo_projeto == null)
            resp = "nome do tipo do projeto não está presente\n"
        if(t.pontos_tipo_projeto == null)
            resp += "pontos que o tipo do projeto dá não estão presentes"
        return resp
    }

    public static async list(): Promise<TipoProjeto[]> {
        let lista: TipoProjeto[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_tipo_projeto, nome_tipo_projeto, pontos_tipo_projeto FROM tipo_projeto") as TipoProjeto[]
        })
        return lista
    }

    public static async create(t: TipoProjeto): Promise<string>{
        let res: string;
        if((res = TipoProjeto.validate(t)))
            throw res
        
        await Sql.conectar(async (sql: Sql) => {
            try {
                sql.query("INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES (?, ?)", [t.nome_tipo_projeto, t.pontos_tipo_projeto])
            } catch(e) {
                if(e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${t.id_tipo_projeto} já está em uso`
                else
                    throw e
            }

        })
        return res
    } 

    public static async read(id: number): Promise<TipoProjeto> {
        let lista: TipoProjeto[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_tipo_projeto, nome_tipo_projeto, pontos_tipo_projeto FROM tipo_projeto WHERE id_tipo_projeto = ?", [id])
        })

        return ((lista && lista[0]) || null)
    }

    public static async update(t:TipoProjeto): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql:Sql) => {
            await sql.query("UPDATE tipo_projeto SET nome_tipo_projeto = ?, pontos_tipo_projeto = ? WHERE id_tipo_projeto = ?", [t.nome_tipo_projeto, t.pontos_tipo_projeto, t.id_tipo_projeto])
            if(!sql.linhasAfetadas)
                res = "Tipo de Projeto não encontrado"
        })

        return res
    }

    public static async delete(id_tipo_projeto: number): Promise<boolean> {
        let res: boolean = true;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM tipo_projeto WHERE id_tipo_projeto = ?", [id_tipo_projeto])
            if(!sql.linhasAfetadas)
                res = false
        })
        
        return res
    }


}