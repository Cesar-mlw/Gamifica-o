import Sql = require("../infra/sql")


export = class ItemUsuario {

    public id_item_usuario: number;
    public ra_usuario: number;
    public id_item: number;
    public dt_semestre_item: Date;




    public static async read(ra: number): Promise<ItemUsuario[]> {
        let lista: ItemUsuario[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select i.id_item, i.nome_item, i.img_url_item, u.dt_semestre_item from item_usuario u, item i where fk_usuario_id = ? and u.fk_item_id = i.id_item", [ra]) as ItemUsuario[]
        })
        return lista
    }


}