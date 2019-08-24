import Sql = require("../infra/sql")


export = class ItemUsuario {

    public id_item_usuario: number;
    public ra_usuario: number;
    public id_item: number;
    public dt_item: Date;




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

        Sql.conectar(async (sql:Sql) => {
            sql.query("SELECT id_item_usuario, ra_usuario, id_item, dt_item FROM item_usuario")
        })

        return lista
    }

    public static async create(i: ItemUsuario): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("INSERT INTO item_usuario (id_item, ra_usuario, dt_item) VALUES (?, ?, ?)", [i.id_item, i.ra_usuario, i.dt_item])
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
            lista = await sql.query("select i.id_item, i.nome_item, i.img_url_item, u.dt_item from item_usuario u, item i where fk_usuario_id = ? and u.fk_item_id = i.id_item", [ra]) as ItemUsuario[]
        })
        return lista
    }

    public static async update(i: ItemUsuario): Promise<string> {
        let res: string;

        Sql.conectar(async (sql: Sql) => {
            await sql.query("UPDATE item_usuario SET id_item = ?, dt_item = ? WHERE id_item_usuario = ?", [i.id_item, i.dt_item, i.id_item_usuario])
            if(!sql.linhasAfetadas)
                res = "Usuário não possui esse item"
        })

        return res
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