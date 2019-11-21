import express = require("express")
import wrap = require("express-async-error-wrapper");
import ItemUsuario = require("../../models/ItemUsuario");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as ItemUsuario
    let erro = await ItemUsuario.create(p)
    console.log(req.body)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Item do usuário criado")
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await ItemUsuario.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idItemUsuario = req.body.idItemUsuario
    let p = await ItemUsuario.delete(idItemUsuario) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.json("Item do usuário não encontrado")
    }

    else {
        res.json("Item do usuário deletado")
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await ItemUsuario.read(ra)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as ItemUsuario
    let erro = await ItemUsuario.update(p)
    if (erro) {

        res.json("O usuário não possui o item")
    }

    else {
        res.json("Item alterado!")
    }
}))

router.post("/placeObject", wrap(async (req: express.Request, res: express.Response) => {
    let id_item_usuario = req.body.id_item_usuario
    let cellx = req.body.cellx
    let celly = req.body.celly
    let erro = await ItemUsuario.placeObject(id_item_usuario, cellx, celly)
    if (!erro) {
        res.json("O usuário não possui o item")
    }

    else {
        res.json("Item Colocado!")
    }
}))

router.post("/removeObject", wrap(async (req: express.Request, res: express.Response) => {
    let id_item_usuario = req.body.id_item_usuario
    let erro = await ItemUsuario.removeObject(id_item_usuario)
    if (!erro) {
        res.json("O usuário não possui o item")
    }

    else {
        res.json("Item Retirado!")
    }
}))

export = router;