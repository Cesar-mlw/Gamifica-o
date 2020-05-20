import express = require("express")
import wrap = require("express-async-error-wrapper");
import Projeto = require("../../models/Projeto");
import Achievement = require("../../models/Achievement");

const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Projeto
    let erro = await Projeto.create(p)
    let achievement = await Projeto.checkForAchievements(p.ra_usuario, p.id_tipo_projeto)
    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        if(achievement.length > 0){
            res.status(200).send(achievement)
        }
        else{
            res.status(200).send({status: "success", message: `projeto ${p.id_projeto} created`})
        }
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Projeto.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idProjeto = req.body.idProjeto
    let p = await Projeto.delete(idProjeto) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.status(404).send({status: "error", message: `projeto ${idProjeto} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `projeto ${idProjeto} deleted`})
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra_usuario
    let p = await Projeto.read(ra)
    res.json(p)
}))


router.post("/readTipoProjetoCount", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await Projeto.readTipoProjetoCounts(ra)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Projeto
    let erro = await Projeto.update(p)
    console.log(erro)

    if (erro) {
        res.status(404).send({status: "error", message: `projeto ${p.id_projeto} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `projeto ${p.id_projeto} altered`})
    }


}))

export = router;