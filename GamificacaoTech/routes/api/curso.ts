import express = require("express")
import wrap = require("express-async-error-wrapper");
import Curso = require("../../models/Curso");


const router = express.Router()


router.post("/create", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Curso
    let erro = await Curso.create(p)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Curso criado")
    }

}))

router.get("/list", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Curso.list()

    res.json(lista)
}))

router.post("/delete", wrap(async (req: express.Request, res: express.Response) => {
    let idCurso = req.body.idCurso
    let p = await Curso.delete(idCurso) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.json("Curso não encontrado")
    }

    else {
        res.json("Curso deletado")
    }
}))


router.post("/read", wrap(async (req: express.Request, res: express.Response) => {
    let idCurso = req.body.idCurso
    let p = await Curso.read(idCurso)
    res.json(p)
}))

router.post("/update", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Curso
    let erro = await Curso.update(p)

    if (erro) {

        res.json("Este Curso não existe")
    }

    else {
        res.json("Curso alterado!")
    }


}))

export = router;