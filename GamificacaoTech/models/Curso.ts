import Sql = require("../infra/sql")

export = class Curso {

    public id_curso: number;
    public nome_curso: string;
    
    public static validate(c: Curso): string {
        let resp: string;
        if(c.nome_curso == null)
            resp = "Nome do curso não pode ser nulo\n"
        return resp
    }

    public static async list(): Promise<Curso[]> {
        let lista: Curso[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_curso, nome_curso FROM curso") as Curso[]
        })
        return lista
    }

    public static async create(c: Curso): Promise<string>{
        let res: string;
        if((res = Curso.validate(c)))
            throw res
        
        await Sql.conectar(async (sql: Sql) => {
            try {
                sql.query("INSERT INTO curso (nome_curso) VALUES (?)", [c.nome_curso])
            } catch(e) {
                if(e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${c.id_curso} já está em uso`
                else
                    throw e
            }

        })
        return res
    } 

    public static async read(id: number): Promise<Curso> {
        let lista: Curso[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            await sql.query("SELECT id_curso, nome_curso FROM curso WHERE id_curso = ?", [id])
        })

        return ((lista && lista[0]) || null)
    }

    public static async update(c:Curso): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql:Sql) => {
            await sql.query("UPDATE curso SET nome_curso = ? WHERE id_curso = ?", [c.id_curso])
            if(!sql.linhasAfetadas)
                res = "Curso não encontrado"
        })

        return res
    }

    public static async delete(id_item: number): Promise<boolean> {
        let res: boolean = true;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM curso WHERE id_curso = ?", [id_item])
            if(!sql.linhasAfetadas)
                res = false
        })
        
        return res
    }


}