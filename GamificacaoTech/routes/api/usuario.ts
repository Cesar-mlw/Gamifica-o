import express = require("express")
import wrap = require("express-async-error-wrapper");
import Usuario = require("../../models/Usuario");
const router = express.Router()

router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let u = req.body as Usuario
    let erro = await Usuario.create(u)
    
    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Usuário criado")
    }
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Usuario
    let erro = await Usuario.update(p)
    console.log(erro)

    if (erro) {

        res.json("Este usuário não existe")
    }

    else {
        res.json("Usuário alterado!")
    }


}))

router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let u = await Usuario.read(ra)
    res.json(u)
}))

router.post("/readUserPoints", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await Usuario.readUserPoints(ra)
    res.json(p)
}))

//criar rota delete

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let u = await Usuario.delete(ra)
    if (u == false) {

        res.json("Usuário não encontrado")
    }

    else {
        res.json("Usuário deletado")
    }
}))

//criar rota listar

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Usuario.list()
    
    res.json(lista)
}))


//efetuar o Login

router.post("/login", wrap(async (req: express.Request, res: express.Response) => {
    let ra = parseInt(req.body.ra)
    let senha = req.body.senha

    let resp = await Usuario.efetuarLogin(ra, senha)

    if (resp) {
        res.cookie("logged", true)
        res.json(true)
    }
    else {
        res.json(false)
    }
}))



router.get("/logout", wrap(async (req: express.Request, res: express.Response) => {
    res.clearCookie("logged")
    res.redirect("/")
}))


export = router;