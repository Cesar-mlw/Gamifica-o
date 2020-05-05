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
    res.render('login', { titulo: 'Area Logada' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
})));
router.get('/home', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //itens / pontos das áreas
    if (req.cookies.logged) {
        let alunos = yield Usuario.list();
        res.render('homeAdmin', { titulo: 'Area Logada', alu: alunos, layout: 'layoutAdmin' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
    }
    else {
        res.redirect("/admin/");
    }
})));
module.exports = router;
//# sourceMappingURL=admin.js.map