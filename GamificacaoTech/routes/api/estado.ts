import express = require("express")
import wrap = require("express-async-error-wrapper");
import Estado = require("../../models/Estado");


const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Estado
    let erro = await Estado.create(p)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `estado ${p.id_estado} created! Glory to Arstotzka`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Estado.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idEstado = req.body.idEstado
    let p = await Estado.delete(idEstado) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.status(404).send({status: "error", message: `estado ${idEstado} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `estado ${idEstado} deleted`})
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idEstado = req.body.idEstado
    let p = await Estado.read(idEstado)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Estado
    let erro = await Estado.update(p)

    if (erro) {

        res.status(404).send({status: "error", message: `Habilidae ${p.id_estado} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `Habilidae ${p.id_estado} altered`})
    }


}))

export = router;