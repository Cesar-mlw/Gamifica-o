import express = require("express")
import wrap = require("express-async-error-wrapper");
import TipoHabilidade = require("../../models/TipoHabilidade");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as TipoHabilidade
    let erro = await TipoHabilidade.create(p)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Tipo de habilidade Registrada")
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await TipoHabilidade.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idTipoHabilidade = req.body.idTipoHabilidade
    let a = await TipoHabilidade.delete(idTipoHabilidade)
    if (a == false) {

        res.json("Tipo de habilidade não encontrada")
    }

    else {
        res.json("Tipo de habilidade deletada")
    }
}))

router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idTipoHabilidade = req.body.idTipoHabilidade
    let a = await TipoHabilidade.read(idTipoHabilidade)
    res.json(a)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let h = req.body as TipoHabilidade
    let erro = await TipoHabilidade.update(h)

    if (erro) {

        res.json("Tipo de habilidade inexistente")
    }

    else {
        res.json("Tipo de habilidade alterado!")
    }


}))

export = router;