import Sql = require("../infra/sql")



export = class Item {

    public id_item: number;
    public nome_item: string;
    public img_url_item: string;
    public preco_item: number;
    public id_area: number;
    
    public static validate(i: Item): string {
        let resp: string;
        if(i.img_url_item == null)
            resp = "URL da imagem não pode ser nulo\n"
        if(i.nome_item == null)
            resp = "Nome do item não pode ser nulo\n"
        if(i.id_area == null)
            resp = "Id da área não pode ser nulo"
        return resp
    }

    public static async list(): Promise<Item[]> {
        let lista: Item[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT i.id_item, i.nome_item, i.img_url_item, i.preco_item, i.id_area, a.nome_area FROM item i, area a where i.id_area = a.id_area") as Item[]
        })
        return lista
    }

    public static async create(i: Item): Promise<string>{
        let res: string;
        if((res = Item.validate(i)))
            throw res
        
        await Sql.conectar(async (sql: Sql) => {
            try {
                sql.query("INSERT INTO item (nome_item, img_url_item, preco_item, id_area) VALUES (?, ?, ?)", [i.nome_item, i.img_url_item, i.preco_item, i.id_area])
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
            lista = await sql.query("SELECT i.id_item, i.nome_item, i.img_url_item, i.preco_item, i.id_area, a.nome_area FROM item i, area a WHERE id_item = ? AND i.id_item = a.id_area", [id])
        })

        return ((lista && lista[0]) || null)
    }
    
    public static async update(i: Item): Promise<string> {
        let res: string;
        
        await Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE item SET nome_item = ?, img_url_item = ?, preco_item = ?, id_area = ? where id_item = ?", [i.nome_item, i.img_url_item, i.preco_item, i.id_item, i.id_area])
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