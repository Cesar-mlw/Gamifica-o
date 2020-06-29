
import express = require('express');
import wrap = require('express-async-error-wrapper')
import Usuario = require('../models/Usuario')


const router = express.Router();

//import usuario
router.get('/', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    //itens / pontos das áreas
    if(await Usuario.userIsAdmin(req.cookies.ra_usuario)){
        res.render('adminPage', { titulo: 'Area Logada', layout: 'layoutAdmin' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
    }
    else{
        res.clearCookie("ra_usuario")
        res.clearCookie("logged")
        res.redirect("/login")
    }
    
}));
router.get('/home', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    //itens / pontos das áreas
    if (req.cookies.logged && await Usuario.userIsAdmin(req.cookies.ra_usuario)) {
        let alunos = await Usuario.list()
        res.render('homeAdmin', { titulo: 'Area Logada', alu: alunos, layout: 'layoutAdmin'}   ); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
    }
    else {
         res.redirect("/admin/")
    } 
}));

router.get('/login', wrap(async (req: express.Request, res: express.Response) => {
    if(!await Usuario.doesNotExist(req.cookies.ra_usuario) && req.cookies.ra_usuario != undefined && req.cookies.logged != undefined && Usuario.userIsAdmin(req.cookies.ra_usuario)){
        res.redirect("/")

    }
    else{
        res.render('loginRegistroAdmin', { titulo: 'Gamificação TECH', layout: 'layoutLogin'}); 
    }
    
}));








export = router;