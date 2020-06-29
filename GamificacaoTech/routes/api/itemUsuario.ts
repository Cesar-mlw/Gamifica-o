import express = require("express")
import wrap = require("express-async-error-wrapper");
import ItemUsuario = require("../../models/ItemUsuario");
import Usuario = require("../../models/Usuario");
import Item = require("../../models/Item");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as ItemUsuario
    let item = await Item.read(p.id_item) as Item
    if (item === null) {
        res.status(404).send({status: "error", message: `item ${p.id_item} not found`})
    }
    else {
        let erro = await Usuario.buyObject(item.preco_item, p.ra_usuario)
        if (erro) {
            res.status(400).send({status: "error", message: erro})
        }
        else {
            let resp = await ItemUsuario.create(p)
            if(resp == undefined) resp = "Item Comprado"
            else resp = "Item nao comprado"
            res.status(200).send({status: "success", message: resp})
        }
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

        res.status(404).send({status: "error", message: `item usuario ${idItemUsuario} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `item usuario ${idItemUsuario} deleted`})
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await ItemUsuario.read(ra)
    res.json(p)
}))

router.post("/readPlacedItems", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await ItemUsuario.readPlacedItems(ra)
    res.json(p)
}))

router.post("/readNotPlacedItems", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await ItemUsuario.readNotPlacedItems(ra)
    res.json(p)
}))

router.post("/readOccupiedPlaces", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await ItemUsuario.readOccupiedPlaces(ra)
    res.json(p)
}))

router.post("/readImageStyle", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await ItemUsuario.readImageStyle(ra)
    res.json(p)
}))

router.post("/readMissingItems", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await ItemUsuario.readMissingItems(ra)
    res.json(p)
}))

router.post("/readMissingItemsSpecific", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let id_area = req.body.idArea
    let p = await ItemUsuario.readMissingItemsSpecific(ra, id_area)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as ItemUsuario
    let erro = await ItemUsuario.update(p)
    if (erro) {

        res.status(404).send({status: "error", message: `user does not have ${p.id_item}`})
    }

    else {
        res.status(200).send({status: "success", message: `item usuario ${p.id_item_usuario} altered`})
    }
}))

router.post("/placeObject", wrap(async (req: express.Request, res: express.Response) => {
    let id_item_usuario = req.body.id_item_usuario
    let cellx = req.body.cellx
    let celly = req.body.celly
    let erro = await ItemUsuario.placeObject(id_item_usuario, cellx, celly)
    if (!erro) {
        res.status(404).send({status: "error", message: `user does not have ${id_item_usuario}`})
    }

    else {
        res.status(200).send({status: "success", message: `item ${id_item_usuario} placed`})
    }
}))

router.post("/removeObject", wrap(async (req: express.Request, res: express.Response) => {
    let id_item_usuario = req.body.id_item_usuario
    let erro = await ItemUsuario.removeObject(id_item_usuario)
    if(erro == null){
        res.status(200).send({status: "success", message: `item ${id_item_usuario} removed`})
    }
    else{
        res.status(400).send({status: "error", message: erro})
    }
}))

export = router;