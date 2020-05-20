import express = require("express")
import wrap = require("express-async-error-wrapper");
import Cidade = require("../../models/Cidade");


const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Cidade
    let erro = await Cidade.create(p)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `cidade ${p.id_cidade} created!`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Cidade.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idCidade = req.body.idCidade
    let p = await Cidade.delete(idCidade) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.status(404).send({status: "error", message: `cidade ${idCidade} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `cidade ${idCidade} deleted`})
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idCidade = req.body.idCidade
    let p = await Cidade.read(idCidade)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Cidade
    let erro = await Cidade.update(p)

    if (erro) {

        res.status(404).send({status: "error", message: `cidade ${p.id_cidade} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `cidade ${p.id_cidade} altered!`})
    }


}))

export = router;