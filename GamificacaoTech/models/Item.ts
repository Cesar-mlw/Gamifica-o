import Sql = require("../infra/sql")



export = class Item {

    public id_item: number;
    public nome_item: string;
    public img_url_item: string;
    public preco_item: number;
    
    public static validate(i: Item): string {
        let resp: string;
        if(i.img_url_item == null)
            resp = "URL da imagem não pode ser nulo\n"
        if(i.nome_item == null)
            resp = "Nome do item não pode ser nulo\n"
        return resp
    }

    public static async list(): Promise<Item[]> {
        let lista: Item[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_item, nome_item, img_url_item, preco_item FROM item") as Item[]
        })
        return lista
    }

    public static async create(i: Item): Promise<string>{
        let res: string;
        if((res = Item.validate(i)))
            throw res
        
        await Sql.conectar(async (sql: Sql) => {
            try {
                sql.query("INSERT INTO item (nome_item, img_url_item, preco_item) VALUES (?, ?, ?)", [i.nome_item, i.img_url_item, i.preco_item])
            } catch(e) {
                if(e.code && e.code == "ER_DUP_ENTRY")
                    res = `O ID ${i.id_item} já está em uso`
                else
                    throw e
            }

        })
        return res
    } 

    public static async read(id: number): Promise<Item> {
        let lista: Item[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT id_item, nome_item, img_url_item, preco_item FROM item WHERE id_item = ?", [id])
        })

        return ((lista && lista[0]) || null)
    }
    
    public static async update(i: Item): Promise<string> {
        let res: string;
        
        await Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE item SET nome_item = ?, img_url_item = ?, preco_item = ? where id_item = ?", [i.nome_item, i.img_url_item, i.preco_item, i.id_item])
            if(!sql.linhasAfetadas)
                res = "Item não existente"
        })

        return res
    }


    public static async delete(id_item: number): Promise<boolean> {
        let res: boolean = true;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("DELETE FROM item WHERE id_item = ?", [id_item])
            if(!sql.linhasAfetadas)
                res = false
        })
        
        return res
    }


}