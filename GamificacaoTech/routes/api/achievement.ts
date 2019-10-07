import express = require("express")
import wrap = require("express-async-error-wrapper");
import Achievement = require("../../models/Achievement");
const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let a = req.body as Achievement
    let erro = await Achievement.create(a)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Achievement criado")
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Achievement.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idAchievement = req.body.idAchievement
    let a = await Achievement.delete(idAchievement)
    if (a == false) {

        res.json("Achievement não encontrado")
    }

    else {
        res.json("Achievement deletado")
    }
}))

router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idAchievement = req.body.idAchievement
    let a = await Achievement.read(idAchievement)
    res.json(a)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let a = req.body as Achievement
    let erro = await Achievement.update(a)

    if (erro) {

        res.json("Achievement inexistente")
    }

    else {
        res.json("Achievement alterado!")
    }


}))

export = router;