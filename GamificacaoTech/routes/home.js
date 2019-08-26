"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Usuario = require("../models/Usuario");
const Projeto = require("../models/Projeto");
const router = express.Router();
//import usuario
router.get('/', wrap(async (req, res) => {
    //itens / pontos das áreas
    let u = await Usuario.read(11122233);
    res.render('home', { titulo: 'Gamificação TECH' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/pc', wrap(async (req, res) => {
    res.render('pc', { titulo: 'Gamificação TECH' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/cv', wrap(async (req, res) => {
    res.render('cvPage', { titulo: 'Gamificação TECH' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/port', wrap(async (req, res) => {
    let projetos = await Projeto.read(11122233);
    res.render('cvPage', { titulo: 'Gamificação TECH', proj: projetos }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/feed', wrap(async (req, res) => {
    res.render('feed', { titulo: 'Gamificação TECH' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/achieve', wrap(async (req, res) => {
    res.render('achieve', { titulo: 'Gamificação TECH' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/formTest', wrap(async (req, res) => {
    res.render('formTest', { titulo: "Gamificação" }); //renderizar a tela
}));
router.get('/portifolio', wrap(async (req, res) => {
    res.render('portifolio', { titulo: "Portifolio" }); //renderizar a tela
}));
module.exports = router;
//# sourceMappingURL=home.js.map