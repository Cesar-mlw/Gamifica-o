import express = require("express")
import wrap = require("express-async-error-wrapper");
import Habilidade = require("../../models/Habilidade");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Habilidade
    let erro = await Habilidade.create(p)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `habilidade ${p.id_habilidade} created!`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Habilidade.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idHabilidade = req.body.idHabilidade
    let a = await Habilidade.delete(idHabilidade)
    if (a == false) {

        res.status(404).send({status: "error", message: `Habilidade ${idHabilidade} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `Habilidade ${idHabilidade} deleted`})
    }
}))

router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let a = await Habilidade.read(ra)
    res.json(a)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let h = req.body as Habilidade
    let erro = await Habilidade.update(h)

    if (erro) {

        res.status(404).send({status: "error", message: `Habilidade ${h.id_habilidade} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `Habilidade ${h.id_habilidade} altered!`})
    }


}))

export = router;