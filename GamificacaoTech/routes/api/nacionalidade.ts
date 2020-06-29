import express = require("express")
import wrap = require("express-async-error-wrapper");
import Nacionalidade = require("../../models/Nacionalidade");


const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Nacionalidade
    let erro = await Nacionalidade.create(p)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `nacionalidade ${p.id_nacionalidade} created`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Nacionalidade.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idNacionalidade = req.body.idNacionalidade
    let p = await Nacionalidade.delete(idNacionalidade) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.status(404).send({status: "error", message: `nacionalidade ${idNacionalidade} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `nacionalidade ${idNacionalidade} deleted`})
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idNacionalidade = req.body.idNacionalidade
    let p = await Nacionalidade.read(idNacionalidade)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Nacionalidade
    let erro = await Nacionalidade.update(p)

    if (erro) {

        res.status(404).send({status: "error", message: `nacionalidade ${p.id_nacionalidade} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `nacionalidade ${p.id_nacionalidade} altered`})
    }


}))

export = router;