import express = require("express")
import wrap = require("express-async-error-wrapper");
import Achievement = require("../../models/Achievement");
const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let a = req.body as Achievement
    let erro = await Achievement.create(a)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `achievement ${a.id_achievement} created!`})
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

        res.status(404).send({status: "error", message: `achievement ${idAchievement} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `area ${idAchievement} deleted`})
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

        res.status(404).send({status: "error", message: `area ${a.id_achievement} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `area ${a.id_achievement} altered!`})
    }


}))

export = router;