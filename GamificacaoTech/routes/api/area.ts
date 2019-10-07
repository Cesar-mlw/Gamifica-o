import express = require("express")
import wrap = require("express-async-error-wrapper");
import Area = require("../../models/Area");


const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Area
    let erro = await Area.create(p)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Area criada")
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Area.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idArea = req.body.idArea
    let p = await Area.delete(idArea) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.json("Area não encontrada")
    }

    else {
        res.json("Area deletada")
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idArea = req.body.idArea
    let p = await Area.read(idArea)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Area
    let erro = await Area.update(p)

    if (erro) {

        res.json("Esta Area não existe")
    }

    else {
        res.json("Area alterada!")
    }


}))

export = router;