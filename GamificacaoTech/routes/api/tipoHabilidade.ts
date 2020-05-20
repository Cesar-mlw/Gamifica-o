import express = require("express")
import wrap = require("express-async-error-wrapper");
import TipoHabilidade = require("../../models/TipoHabilidade");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as TipoHabilidade
    let erro = await TipoHabilidade.create(p)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `Tipo de habilidade ${p.id_tipo_habilidade} created`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await TipoHabilidade.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idTipoHabilidade = req.body.idTipoHabilidade
    let a = await TipoHabilidade.delete(idTipoHabilidade)
    if (a == false) {

        res.status(404).send({status: "error", message: `Tipo de habilidade ${idTipoHabilidade} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `Tipo de habilidade ${idTipoHabilidade} deleted`})
    }
}))

router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idTipoHabilidade = req.body.idTipoHabilidade
    let a = await TipoHabilidade.read(idTipoHabilidade)
    res.json(a)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let h = req.body as TipoHabilidade
    let erro = await TipoHabilidade.update(h)

    if (erro) {

        res.status(404).send({status: "error", message: `Tipo de habilidade ${h.id_tipo_habilidade} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `Tipo de habilidade ${h.id_tipo_habilidade} altered`})
    }


}))

export = router;