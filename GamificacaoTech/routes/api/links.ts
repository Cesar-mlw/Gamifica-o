import express = require("express")
import wrap = require("express-async-error-wrapper");
import Links = require("../../models/Links");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Links
    let erro = await Links.create(p)
    console.log(req.body)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Link criado")
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Links.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idLink = req.body.idLink
    let p = await Links.delete(idLink) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.json("Link do usuário não encontrado")
    }

    else {
        res.json("Link do usuário deletado")
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await Links.read(ra)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Links
    let erro = await Links.update(p)

    if (erro) {

        res.json("O usuário não possui o item")
    }

    else {
        res.json("Link alterado!")
    }


}))

export = router;