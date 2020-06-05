
import express = require('express');
import wrap = require('express-async-error-wrapper')
import Usuario = require('../models/Usuario')


const router = express.Router();

//import usuario
router.get('/', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    //itens / pontos das áreas
    res.render('adminPaige', { titulo: 'Area Logada', layout: 'layoutAdmin' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
    
    
}));
router.get('/home', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    //itens / pontos das áreas
    if (req.cookies.logged) {
        let alunos = await Usuario.list()
        res.render('homeAdmin', { titulo: 'Area Logada', alu: alunos, layout: 'layoutAdmin'}   ); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
    }
    else {
         res.redirect("/admin/")
    } 
}));






export = router;