import express = require("express")
import wrap = require("express-async-error-wrapper");
import Pais = require("../../models/Pais");


const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Pais
    let erro = await Pais.create(p)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `pais ${p.id_pais} created`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Pais.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idPais = req.body.idPais
    let p = await Pais.delete(idPais) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.status(404).send({status: "error", message: `pais ${idPais} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `Tipo de projeto ${idPais} deleted`})
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idPais = req.body.idPais
    let p = await Pais.read(idPais)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Pais
    let erro = await Pais.update(p)

    if (erro) {

        res.status(404).send({status: "error", message: `pais ${p.id_pais} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `Tipo de projeto ${p.id_pais} altered`})
    }


}))

export = router;