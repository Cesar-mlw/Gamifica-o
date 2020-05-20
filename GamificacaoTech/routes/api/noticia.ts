import express = require("express")
import wrap = require("express-async-error-wrapper");
import Noticia = require("../../models/Noticia");


const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Noticia
    let erro = await Noticia.create(p)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `noticia ${p.id_noticia} created`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Noticia.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idNoticia = req.body.idNoticia
    let p = await Noticia.delete(idNoticia) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.status(404).send({status: "error", message: `noticia ${idNoticia} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `noticia ${idNoticia} deleted`})
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idNoticia = req.body.idNoticia
    let p = await Noticia.read(idNoticia)
    res.json(p)
}))

router.post("/readFromUserID", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await Noticia.readFromUserId(ra)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Noticia
    let erro = await Noticia.update(p)

    if (erro) {

        res.status(404).send({status: "error", message: `noticia ${p.id_noticia} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `noticia ${p.id_noticia} altered`})
    }


}))

export = router;