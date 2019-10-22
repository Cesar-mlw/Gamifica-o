
import express = require('express');
import wrap = require('express-async-error-wrapper')
import Usuario = require('../models/Usuario')
import Projeto = require('../models/Projeto');
import BookSpiller = require('../utils/bookSpiller')
const router = express.Router();

//import usuario
router.get('/', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    
    let points = await Usuario.readUserPoints(11710371)
    let books = []
    for(let i = 0; i < points.length; i++){
        books.push(BookSpiller.bookSpiller(points[i]['pontos'], points[i]['id']))
    }
    // Book pile string builder
    res.render('home', { titulo: 'Gamificação TECH'}); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/pc', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    res.render('pc', { titulo: 'Gamificação TECH'}); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/cv', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    res.render('cvPage', { titulo: 'Gamificação TECH'}); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/port', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    let projetos = await Projeto.read(11122233)
    res.render('cvPage', { titulo: 'Gamificação TECH', proj:projetos }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/feed', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    res.render('feed', { titulo: 'Gamificação TECH'}); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/achieve', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    res.render('achieve', { titulo: 'Gamificação TECH'}); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/formTest', wrap(async (req: express.Request, res: express.Response) => {
    res.render('formTest', { titulo: "Gamificação" })//renderizar a tela
}));

router.get('/portifolio', wrap(async (req: express.Request, res: express.Response) => {
    res.render('portifolio', { layout:'layoutVazio'})//renderizar a tela
}));

router.get('/curriculo', wrap(async (req: express.Request, res: express.Response) => {
    res.render('curriculo', { layout:'layoutVazio'})//renderizar a tela
}));

router.get('/testeAjax', wrap(async (req: express.Request, res: express.Response) => {
    res.render('testeAjax', { layout:'layoutVazio'})//renderizar a tela
}));

router.get('/registroProjeto', wrap(async (req: express.Request, res: express.Response) => {
    res.render('registroProjeto', { layout:'layoutVazio'})//renderizar a tela
}));



export = router;