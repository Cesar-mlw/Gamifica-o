import express = require("express")
import wrap = require("express-async-error-wrapper");
import TituloLink = require("../../models/TituloLinks");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as TituloLink
    let erro = await TituloLink.create(p)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Título de link criado")
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await TituloLink.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idTituloLink = req.body.idTituloLink
    let p = await TituloLink.delete(idTituloLink) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.json("Título de link não encontrado")
    }

    else {
        res.json("Título de link deletado")
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idTituloLink = req.body.idTituloLink
    let p = await TituloLink.read(idTituloLink)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as TituloLink
    let erro = await TituloLink.update(p)
    console.log(erro)

    if (erro) {

        res.json("Este título de link não existe")
    }

    else {
        res.json("Título de link alterado!")
    }


}))

export = router;