"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Usuario = require("../models/Usuario");
const Projeto = require("../models/Projeto");
const StringBuilder = require("../utils/stringBuilder");
const Habilidade = require("../models/Habilidade");
const AchievementUsuario = require("../models/AchievementUsuario");
const router = express.Router();
//import usuario
router.get('/', wrap(async (req, res) => {
    let points = await Usuario.readUserPoints(11710371);
    let books = [];
    for (let i = 0; i < points.length; i++) {
        books.push(StringBuilder.bookSpiller(points[i]['pontos'], points[i]['id']));
    }
    let featuredAchievements = await AchievementUsuario.readFeaturedAchievements(11710370);
    let achievements = await AchievementUsuario.readFromUserID(11710370);
    let missingAchievements = await AchievementUsuario.readMissingAchievements(11710370);
    console.log(achievements);
    console.log(missingAchievements);
    console.log(featuredAchievements);
    // Book pile string builder
    res.render('home', { titulo: 'Gamificação TECH' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/pc', wrap(async (req, res) => {
    res.render('pc', { titulo: 'Gamificação TECH' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
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
    let projetos = await Projeto.read(11710370);
    console.log(projetos);
    res.render('portifolio', { layout: 'layoutVazio' }); //renderizar a tela
}));
router.get('/curriculo', wrap(async (req, res) => {
    let habs = await Habilidade.read(11710370);
    console.log(habs);
    res.render('curriculo', { layout: 'layoutVazio' }); //renderizar a tela
}));
router.get('/testeAjax', wrap(async (req, res) => {
    res.render('testeAjax', { layout: 'layoutVazio' }); //renderizar a tela
}));
router.get('/registroProjeto', wrap(async (req, res) => {
    res.render('registroProjeto', { layout: 'layoutVazio' }); //renderizar a tela
}));
module.exports = router;
//# sourceMappingURL=home.js.map