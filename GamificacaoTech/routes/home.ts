
import express = require('express');
import wrap = require('express-async-error-wrapper')
import Usuario = require('../models/Usuario')
import Projeto = require('../models/Projeto');
import StringBuilder = require('../utils/stringBuilder')
import Habilidade = require('../models/Habilidade');
import AchievementUsuario = require('../models/AchievementUsuario');
import Achievement = require('../models/Achievement');
import ItemUsuario = require('../models/ItemUsuario');
import Area = require('../models/Area');
import TipoProjeto = require('../models/TipoProjeto');
const router = express.Router();

//import usuario
router.get('/', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    let points = await Usuario.readUserPoints(11710370)
    let books = []
    for(let i = 0; i < points.length; i++){
        books.push(StringBuilder.bookSpiller(points[i]['pontos'], points[i]['id']))
    }
    let allAchievements = await Achievement.list()
    let missingAchievements = await AchievementUsuario.readMissingAchievements(11710370)
    let achieveHTML = StringBuilder.shelfSpiller(allAchievements, missingAchievements)
    let achievePreviewHTML = StringBuilder.shelfPreviewSpiller(allAchievements, missingAchievements)
    let notPlacedItemsJson = await ItemUsuario.readNotPlacedItems(11710370)
    let notPlacedItems = StringBuilder.itemBoxSpiller(await ItemUsuario.readNotPlacedItems(11710370))
    let placedItemsJson = await ItemUsuario.readPlacedItems(11710370)
    let placedItems = StringBuilder.placedItemSpiller(await ItemUsuario.readPlacedItems(11710370))
    // console.log(StringBuilder.storeItemSpiller(await ItemUsuario.readMissingItems(11710370)))
    // Book pile string builder
    res.render('home', { titulo: 'Gamificação TECH', 
                        books: books, 
                        achieveHTML: achieveHTML,
                        achievePreviewHTML: achievePreviewHTML,
                        notPlacedItemsJson: JSON.stringify(notPlacedItemsJson),
                        notPlacedItems: notPlacedItems,
                        placedItems: placedItems,
                        placedItemsJson: JSON.stringify(placedItemsJson)});
                        //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/pc', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    res.render('pc', { titulo: 'Gamificação TECH'}); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/login', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    res.render('loginRegistro', { titulo: 'Gamificação TECH'}); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
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
    let projetos = await Projeto.read(11710370)
    let projetosHTML = StringBuilder.projectSpiller(await Projeto.read(11710370))
    let numeroDeProjetos = projetos.length
    let listaArea = StringBuilder.areaSpiller(await Area.list())
    let listaTipoProjeto = StringBuilder.tipoProjetoSpiller(await TipoProjeto.list())
    res.render('portifolio', { layout:'layoutVazio',
                                projetos: projetos,
                                projetosHTML: projetosHTML,
                                numeroDeProjetos: numeroDeProjetos,
                                listaArea: listaArea,
                                listaTipoProjeto: listaTipoProjeto})//renderizar a tela
}));

router.get('/curriculo', wrap(async (req: express.Request, res: express.Response) => {
    let habs = await Habilidade.read(11710370)
    res.render('curriculo', { layout:'layoutVazio',
                            habilidades: habs})//renderizar a tela
}));

router.get('/testeAjax', wrap(async (req: express.Request, res: express.Response) => {
    res.render('testeAjax', { layout:'layoutVazio'})//renderizar a tela
}));

router.get('/registroProjeto', wrap(async (req: express.Request, res: express.Response) => {
    res.render('registroProjeto', { layout:'layoutVazio'})//renderizar a tela
}));

router.get('/loja', wrap(async (req: express.Request, res: express.Response) => {
    let storeItems = StringBuilder.storeItemSpiller(await ItemUsuario.readMissingItems(11710370))
    res.render('loja', { 
        layout:'layoutVazio',
        storeItems: storeItems});//renderizar a tela
}));



export = router;