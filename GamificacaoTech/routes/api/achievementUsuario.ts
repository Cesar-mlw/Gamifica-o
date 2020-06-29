import express = require("express")
import wrap = require("express-async-error-wrapper");
import AchievementUsuario = require("../../models/AchievementUsuario");
const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let id = req.body.id_achievement
    let erro = await AchievementUsuario.create(ra, id)

    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `achievement usuario ${id} created!`})
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await AchievementUsuario.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idAchievementUsuario = req.body.idAchievementUsuario
    let a = await AchievementUsuario.delete(idAchievementUsuario)
    if (a == false) {

        res.status(404).send({status: "error", message: `User does not have achievement ${idAchievementUsuario}`})
    }

    else {
        res.status(200).send({status: "success", message: `achievement ${idAchievementUsuario} deleted`})
    }
}))

router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idAchievementUsuario = req.body.idAchievementUsuario
    let a = await AchievementUsuario.read(idAchievementUsuario)
    res.json(a)
}))

router.post("/readFromUserID", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let a = await AchievementUsuario.readFromUserID(ra)
    res.json(a)
}))

router.post("/readMissingAchievements", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let a = await AchievementUsuario.readMissingAchievements(ra)
    res.json(a)
}))

router.post("/readFeaturedAchievements", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let a = await AchievementUsuario.readFeaturedAchievements(ra)
    res.json(a)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let a = req.body as AchievementUsuario
    let erro = await AchievementUsuario.update(a)

    if (erro) {

        res.status(404).send({status: "error", message: `achievement usuario ${a.id_achievement_usuario} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `achievement usuario ${a.id_achievement_usuario} altered!`})
    }


}))

export = router;