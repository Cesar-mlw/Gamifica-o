import express = require("express")
import wrap = require("express-async-error-wrapper");
import DadosCurriculo = require("../../models/DadosCurriculo");


const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as DadosCurriculo
    let erro = await DadosCurriculo.create(p)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `dados ${p.id_dados_curriculo} created!`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await DadosCurriculo.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idDados = req.body.idDados
    let p = await DadosCurriculo.delete(idDados) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.status(404).send({status: "error", message: `dados ${idDados} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `dados ${idDados} deleted`})
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let UserId = req.body.UserId
    let p = await DadosCurriculo.readByUserId(UserId)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as DadosCurriculo
    let erro = await DadosCurriculo.update(p)

    if (erro) {

        res.status(404).send({status: "error", message: `dados ${p.id_dados_curriculo} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `dados ${p.id_dados_curriculo} altered!`})
    }


}))

export = router;