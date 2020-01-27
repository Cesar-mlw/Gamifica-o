import Sql = require("../infra/sql")
import ItemItemUsuarioJoin = require("./ItemItemUsuarioJoin");
import Item = require("./Item")


export = class ItemUsuario {

    public id_item_usuario: number;
    public ra_usuario: number;
    public id_item: number;
    public dt_item: Date;
    public cellx_item: number;
    public celly_item: number;
    public width: number;
    public height: number;




    public static validate(i: ItemUsuario): string {
        let res: string
        if(i.ra_usuario == null)
            res = "O RA do usuário não pode ser nulo\n"
        if(i.id_item == null)
            res = "O id do item não pode ser nulo\n"
        if(i.dt_item == null)
            res = "A data do item não pode ser nula\n"
        return res
    }

    public static async list(): Promise<ItemUsuario[]> {
        let lista: ItemUsuario[] = null

        await Sql.conectar(async (sql:Sql) => {
            lista = await sql.query("SELECT u.id_item_usuario, u.ra_usuario, u.id_item, u.dt_item, i.nome_item, i.img_url_item, u.cellx_item, u.celly_item, u.width, u.height FROM item_usuario u, item i WHERE u.id_item = i.id_item") as ItemUsuario[]
        })

        return lista
    }

    public static async create(i: ItemUsuario): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("INSERT INTO item_usuario (id_item, ra_usuario, dt_item, cellx_item, celly_item, width, height) VALUES (?, ?, ?, ?, ?, ?, ?)", [i.id_item, i.ra_usuario, i.dt_item, i.cellx_item, i.celly_item, i.width, i.height])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${i.id_item_usuario} já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async read(ra: number): Promise<ItemUsuario[]> {
        let lista: ItemUsuario[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select i.id_item, i.nome_item, i.img_url_item, u.dt_item, u.id_item_usuario, u.id_item, u.cellx_item, u.celly_item, u.width, u.height, u.positioned_item from item_usuario u, item i where ra_usuario = ? and u.id_item = i.id_item", [ra]) as ItemUsuario[]
        })
        return lista
    }

    public static async readPlacedItems(ra: number): Promise<ItemItemUsuarioJoin[]>{
        let lista: ItemItemUsuarioJoin[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT u.id_item_usuario, u.ra_usuario, u.id_item, u.cellx_item, u.celly_item, u.width, u.height, u.positioned_item, i.nome_item, i.img_url_item, i.preco_item FROM item_usuario u, item i WHERE u.ra_usuario = ? AND u.positioned_item = TRUE AND u.id_item = i.id_item", [ra]) as ItemItemUsuarioJoin[]
        })

        return lista
    }

    public static async readNotPlacedItems(ra: number): Promise<ItemItemUsuarioJoin[]>{
        let lista: ItemItemUsuarioJoin[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT u.id_item_usuario, u.ra_usuario, u.id_item, u.cellx_item, u.celly_item, u.width, u.height, u.positioned_item, i.nome_item, i.img_url_item, i.preco_item FROM item_usuario u, item i WHERE u.ra_usuario = ? AND u.positioned_item = FALSE AND u.id_item = i.id_item", [ra]) as ItemItemUsuarioJoin[]
        })

        return lista
    }

    public static async readOccupiedPlaces(ra: number): Promise<ItemUsuario[]>{
        let lista: ItemUsuario[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT cellx_item, celly_item FROM item_usuario u WHERE u.ra_usuario = ? AND u.positioned_item = true", [ra]) as ItemUsuario[]
        })

        return lista
    }
    
    public static async readImageStyle(ra: number): Promise<ItemUsuario[]>{
        let lista: ItemUsuario[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("SELECT u.width, u.height, i.img_url_item FROM item_usuario u, item i WHERE u.ra_usuario = 11710371 AND u.positioned_item = false and u.id_item = i.id_item;", [ra]) as ItemUsuario[]
        })

        return lista
    }

    public static async update(i: ItemUsuario): Promise<string> {
        let res: string;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE item_usuario SET id_item = ?, dt_item = ?, width = ?, height = ? WHERE id_item_usuario = ?", [i.id_item, i.dt_item, i.width, i.height, i.id_item_usuario])
            if(!sql.linhasAfetadas)
                res = "Usuário não possui esse item"
        })

        return res
    }

    public static async placeObject(id_item_usuario:number, cellx: number, celly: number): Promise<boolean> {
        let res: boolean = true

        Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE item_usuario SET cellx_item = ?, celly_item = ?, positioned_item = true where id_item_usuario = ?", [cellx, celly, id_item_usuario])
            if(!sql.linhasAfetadas)
                res = false
        })

        return res
    }
    
    public static async removeObject(id_item_usuario:number): Promise<boolean> {
        let res: boolean = true

        Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE item_usuario SET cellx_item = NULL, celly_item = NULL, positioned_item = false where id_item_usuario = ?", [id_item_usuario])
            if(!sql.linhasAfetadas)
                res = false
        })

        return res
    }

    public static async readMissingItems(ra: number): Promise<Item[]>{
        let lista: Item[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from item a where a.id_item not in (SELECT id_item FROM item_usuario u where u.ra_usuario = ?)", [ra])
        })

        return lista
    }

    public static async readMissingItemsSpecific(ra: number, id: number): Promise<Item[]>{
        let lista: Item[] = null
        
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from item a where a.id_item not in (SELECT id_item FROM item_usuario u where u.ra_usuario = ?) AND id_area = ?;", [ra, id])
        })

        return lista
    }

    

    public static async delete(id: number): Promise<boolean> {
        let res: boolean = true

        Sql.conectar(async (sql:Sql) => {
            await sql.query("DELETE FROM item_usuario WHERE id_item_usuario = ?", [id])
            if(!sql.linhasAfetadas)
                res = false
        })

        return res
    }


}