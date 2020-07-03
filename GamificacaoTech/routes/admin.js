"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Usuario = require("../models/Usuario");
const router = express.Router();
//import usuario
router.get('/', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //itens / pontos das áreas
    if (req.cookies.ra_usuario != undefined && req.cookies.logged != undefined && (yield Usuario.userIsAdmin(req.cookies.ra_usuario))) {
        res.render('adminPage', { titulo: 'Area Logada', layout: 'layoutAdmin' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
    }
    else {
        res.clearCookie("ra_usuario");
        res.clearCookie("logged");
        res.redirect("/login");
    }
})));
router.get('/home', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //itens / pontos das áreas
    if (req.cookies.logged && (yield Usuario.userIsAdmin(req.cookies.ra_usuario))) {
        let alunos = yield Usuario.list();
        let alunosPoints = [];
        for (let i = 0; i < alunos.length; i++) {
            let points = yield Usuario.readUserAdminPoints(alunos[i].ra_usuario);
            if (points.length > 0) {
                let pontos_games = 0;
                let pontos_bi = 0;
                let pontos_dev = 0;
                let pontos_inov = 0;
                for (let j = 0; j < points.length; j++) {
                    if (points[j]["id_area"] == 1) {
                        pontos_games = points[j]["pontos"];
                    }
                    if (points[j]["id_area"] == 2) {
                        pontos_bi = points[j]["pontos"];
                    }
                    if (points[j]["id_area"] == 3) {
                        pontos_dev = points[j]["pontos"];
                    }
                    if (points[j]["id_area"] == 4) {
                        pontos_inov = points[j]["pontos"];
                    }
                }
                alunosPoints.push({
                    ra_usuario: alunos[i].ra_usuario,
                    nome_usuario: alunos[i].nome_usuario,
                    pontos_bi: pontos_bi,
                    pontos_games: pontos_games,
                    pontos_dev: pontos_dev,
                    pontos_inov: pontos_inov
                });
            }
            else {
                alunosPoints.push({
                    ra_usuario: alunos[i].ra_usuario,
                    nome_usuario: alunos[i].ra_usuario,
                    pontos_bi: 0,
                    pontos_games: 0,
                    pontos_dev: 0,
                    pontos_inov: 0
                });
            }
        }
        res.render('homeAdmin', { titulo: 'Area Logada', aluPoints: alunosPoints, layout: 'layoutAdmin' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
    }
    else {
        res.redirect("/admin/");
    }
})));
router.get('/login', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield Usuario.doesNotExist(req.cookies.ra_usuario)) && req.cookies.ra_usuario != undefined && req.cookies.logged != undefined && Usuario.userIsAdmin(req.cookies.ra_usuario)) {
        res.redirect("/");
    }
    else {
        res.render('loginRegistroAdmin', { titulo: 'Gamificação TECH', layout: 'layoutLogin' });
    }
})));
router.get('/noticias', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.logged && !Usuario.userIsAdmin(req.cookies.ra_usuario)) {
        res.redirect("/");
    }
    else {
        res.render('noticias', { titulo: 'Gamificação TECH', layout: 'layoutAdmin' });
    }
})));
module.exports = router;
//# sourceMappingURL=admin.js.map