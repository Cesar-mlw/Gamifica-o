import express = require("express")
import wrap = require("express-async-error-wrapper");
import TipoProjeto = require("../../models/TipoProjeto");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as TipoProjeto
    let erro = await TipoProjeto.create(p)
    console.log(req.body)

    if (erro) {
        res.statusCode = 400
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `Tipo de projeto ${p.nome_tipo_projeto} created`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await TipoProjeto.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idTipoProjeto = req.body.idTipoProjeto
    let p = await TipoProjeto.delete(idTipoProjeto) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.status(404).send({status: "error", message: `Tipo de projeto ${idTipoProjeto} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `Tipo de projeto ${idTipoProjeto} deleted`})
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idTipoProjeto = req.body.idTipoProjeto
    let p = await TipoProjeto.read(idTipoProjeto)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as TipoProjeto
    let erro = await TipoProjeto.update(p)

    if (erro) {

        res.status(404).send({status: "error", message: `Tipo de projeto ${p.id_tipo_projeto} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `Tipo de projeto ${p.id_tipo_projeto} altered`})
    }


}))

export = router;