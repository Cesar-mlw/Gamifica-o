import express = require("express")
import wrap = require("express-async-error-wrapper");
import ItemUsuario = require("../../models/ItemUsuario");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as ItemUsuario
    let erro = await ItemUsuario.create(p)
    console.log(req.body)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Item do usuário criado")
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await ItemUsuario.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idItemUsuario = req.body.idItemUsuario
    let p = await ItemUsuario.delete(idItemUsuario) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.json("Item do usuário não encontrado")
    }

    else {
        res.json("Item do usuário deletado")
    }
}))


router.get("/read", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.query.ra
    let p = await ItemUsuario.read(ra)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as ItemUsuario
    let erro = await ItemUsuario.update(p)
    console.log(erro)

    if (erro) {

        res.json("O usuário não possui o item")
    }

    else {
        res.json("Item alterado!")
    }


}))

export = router;