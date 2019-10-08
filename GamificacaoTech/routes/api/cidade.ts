import express = require("express")
import wrap = require("express-async-error-wrapper");
import Cidade = require("../../models/Cidade");


const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Cidade
    let erro = await Cidade.create(p)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Cidade criada")
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
        res.json("Cidade não encontrada")
    }

    else {
        res.json("Cidade deletada")
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

        res.json("Esta Cidade não existe")
    }

    else {
        res.json("Cidade alterada!")
    }


}))

export = router;