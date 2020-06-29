import express = require("express")
import wrap = require("express-async-error-wrapper");
import Usuario = require("../../models/Usuario");
import { CLIENT_RENEG_WINDOW } from "tls";
const router = express.Router()

router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let u = req.body as Usuario
    let erro = await Usuario.create(u)
    
    if (erro) {
        res.status(400).send({status: "error", message: erro})
    }
    else {
        res.status(200).send({status: "success", message: `User ${u.ra_usuario} created!`})
    }
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Usuario
    let erro = await Usuario.update(p)
    console.log(erro)

    if (erro) {

        res.status(404).send({status: "error", message: `User ${p.ra_usuario} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `User ${p.ra_usuario} altered!`})
    }


}))

router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let u = await Usuario.read(ra)
    res.json(u)
}))

router.post("/readUserCoins", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let u = await Usuario.readUserCoins(ra)
    res.json(u)
}))

router.post("/readUserPoints", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await Usuario.readUserPoints(ra)
    res.json(p)
}))

router.post("/readUserGeneralPoints", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let p = await Usuario.readUserGeneralPoints(ra)
    res.json(p)
}))

//criar rota delete

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let ra = req.body.ra
    let u = await Usuario.delete(ra)
    if (u == false) {

        res.status(404).send({status: "error", message: `User ${ra} not found`})
    }

    else {
        res.status(200).send({status: "success", message: `User ${ra} deleted`})
    }
}))

//criar rota listar

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Usuario.list()
    
    res.json(lista)
}))


//efetuar o Login

router.post("/login", wrap(async (req: express.Request, res: express.Response) => {
    let ra = parseInt(req.body.ra_usuario)
    let senha = req.body.senha_usuario
    let resp
    let user
    if (isNaN(ra)){
        res.status(401).send({status: "error", message: "Only Numbers are accepted on this field"})
    }
    else{
        resp = await Usuario.efetuarLogin(ra, senha)
        user = await Usuario.userIsAdmin(ra)
        if (resp) {        
            res.cookie("logged", true, {expires: false})
            res.cookie("ra_usuario", req.body.ra_usuario, {expires: false})
            res.status(200).send({status: "success", message: `Welcome ${ra}`, isAdmin: user})
        }
        else {
            res.status(401).send({status: "error", message: `User not found for the RA ${ra}`})
        }
    }
}))



router.get("/logout", wrap(async (req: express.Request, res: express.Response) => {
    res.clearCookie("logged")
    res.clearCookie("ra_usuario")
    res.redirect("/login")
}))


export = router;


