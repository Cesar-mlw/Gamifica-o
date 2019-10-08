import express = require("express")
import wrap = require("express-async-error-wrapper");
import DadosCurriculo = require("../../models/DadosCurriculo");


const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as DadosCurriculo
    let erro = await DadosCurriculo.create(p)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Dados criados")
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

        res.json("Dados não encontrados")
    }

    else {
        res.json("Dados deletados")
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

        res.json("Estes dados não existem")
    }

    else {
        res.json("Dados alterados!")
    }


}))

export = router;