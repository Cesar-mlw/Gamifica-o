import Sql = require("../infra/sql")

export = class DadosCurriculo {
    public id_dados_curriculo: number;
    public nome_completo_dados_curriculo: string;
    public nacionalidade_dados_curriculo: number;
    public endereco_dados_curriculo: number;
    public email_dados_curriculo: string;
    public telefone_dados_curriculo: string;
    public sinopse_dados_curriculo: string;
    public ra_usuario: number;

    public static validate (d: DadosCurriculo): string {
        let resp: string;
        if(d.nome_completo_dados_curriculo == null)
            resp += "O nome não pode ser nulo "
        if(d.nacionalidade_dados_curriculo == null)
            resp += "A nacionalidade não pode ser nula "
        if(d.endereco_dados_curriculo == null)
            resp += "O endereco não pode ser nulo "
        if(d.email_dados_curriculo == null)
            resp += "O email não pode ser nulo "
        if(d.telefone_dados_curriculo == null)
            resp += "O telefone não pode ser nulo "
        if(d.ra_usuario == null)
            resp += "O RA do usuário não pode ser nulo "
        
        return resp
    }   

    public static async list(): Promise<DadosCurriculo[]> {
        let lista: DadosCurriculo[] = null;

        await Sql.conectar(async(sql: Sql) => {
            lista = await sql.query("SELECT * FROM dados_curriculo") as DadosCurriculo[]
        })

        return lista
    }
    public static async create(d: DadosCurriculo): Promise<string> {
        let res: string;

        if((res = DadosCurriculo.validate(d)))
            return res
        
        await Sql.conectar(async(sql: Sql) => {
            try{
                await sql.query("INSERT INTO dados_curriculo (nome_completo_dados_curriculo, nacionalidade_dados_curriculo, endereco_dados_curriculo, email_dados_curriculo, telefone_dados_curriculo, sinopse_dados_curriculo, ra_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)", [d.nacionalidade_dados_curriculo, d.nacionalidade_dados_curriculo, d.endereco_dados_curriculo, d.email_dados_curriculo, d.telefone_dados_curriculo, d.sinopse_dados_curriculo, d.ra_usuario])
            } catch (e){
                if(e.code && e.code == 'ER_DUP_ENTRY')
                    res = `O ID ${d.id_dados_curriculo} já está em uso`
                else 
                    throw e
            }
        })
        return res
    }

    public static async update(d: DadosCurriculo): Promise<string> {
        let res: string;

        await Sql.conectar(async(sql:Sql) => {
            await sql.query("UPDATE dados_curriculo SET nome_completo_dados_curriculo = ?, nacionalidade_dados_curriculo = ?, endereco_dados_curriculo = ?, email_dados_curriculo = ?, telefone_dados_curriculo = ?, sinopse_dados_curriculo = ?", [d.nome_completo_dados_curriculo, d.nacionalidade_dados_curriculo, d.endereco_dados_curriculo, d.email_dados_curriculo, d.telefone_dados_curriculo, d.sinopse_dados_curriculo])
            if(!sql.linhasAfetadas)
                res = "Dados Inexistente"
        })

        return res
    }

    public static async readByUserId(ra: number): Promise<DadosCurriculo[]> {
        let res: DadosCurriculo[] = null

        await Sql.conectar(async(sql: Sql) => {
            res = await sql.query("SELECT d.nome_completo_dados_curriculo, n.nome_nacionalidade, e.logradouro_endereco, e.numero_endereco, e.complemento_endereco, d.email_dados_curriculo, d.telefone_dados_curriculo, d.sinopse_dados_curriculo, d.ra_usuario FROM dados_curriculo d, endereco e, nacionalidade n WHERE d.nacionalidade_dados_curriculo = n.id_nacionalidade AND d.endereco_dados_curriculo = e.id_endereco AND d.ra_usuario = ?", [ra]) as DadosCurriculo[]
        })

        return res
    }

    public static async delete(ra: number): Promise<boolean> {
        let res: boolean = true

        await Sql.conectar(async(sql:Sql) => {
            await sql.query("DELETE FROM dados_curriculo WHERE id_dados_curriculo = ?", [ra])
            if(!sql.linhasAfetadas)
                res = false
        })

        return res
    }
}