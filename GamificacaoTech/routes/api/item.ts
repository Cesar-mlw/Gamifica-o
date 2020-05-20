import express = require("express")
import wrap = require("express-async-error-wrapper");
import Item = require("../../models/Item");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Item
    let erro = await Item.create(p)
    console.log(req.body)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `item ${p.id_item} created!`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Item.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idItem = req.body.idItem
    let p = await Item.delete(idItem) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.status(404).send({status: "error", message: `User ${idItem} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `User ${idItem} deleted!`})
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idItem = req.body.idItem
    let p = await Item.read(idItem)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Item
    let erro = await Item.update(p)
    console.log(erro)

    if (erro) {

        res.status(404).send({status: "error", message: `User ${p.id_item} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `User ${p.id_item} altered!`})
    }


}))

export = router;