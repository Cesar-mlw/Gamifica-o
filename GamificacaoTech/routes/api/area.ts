import express = require("express")
import wrap = require("express-async-error-wrapper");
import Area = require("../../models/Area");
import { isArray } from "util";

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Area
    let erro = await Area.create(p)
    console.log(req.body)

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

        res.json("Area não encontrado")
    }

    else {
        res.json("Area deletado")
    }
}))


router.get("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idArea = req.query.idArea
    let p = await Area.read(idArea)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Area
    let erro = await Area.update(p)
    console.log(erro)

    if (erro) {

        res.json("Esta Area não existe")
    }

    else {
        res.json("Area alterado!")
    }


}))

export = router;