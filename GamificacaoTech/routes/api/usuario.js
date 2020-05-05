"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Usuario = require("../../models/Usuario");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = req.body;
    let erro = yield Usuario.create(u);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Usuário criado");
    }
})));
router.post("/update", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Usuario.update(p);
    console.log(erro);
    if (erro) {
        res.json("Este usuário não existe");
    }
    else {
        res.json("Usuário alterado!");
    }
})));
router.post("/read", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let ra = req.body.ra;
    let u = yield Usuario.read(ra);
    res.json(u);
})));
router.post("/readUserPoints", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield Usuario.readUserPoints(ra);
    res.json(p);
})));
router.post("/readUserGeneralPoints", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield Usuario.readUserGeneralPoints(ra);
    res.json(p);
})));
//criar rota delete
router.post("/delete", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let ra = req.body.ra;
    let u = yield Usuario.delete(ra);
    if (u == false) {
        res.json("Usuário não encontrado");
    }
    else {
        res.json("Usuário deletado");
    }
})));
//criar rota listar
router.get("/list", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let lista = yield Usuario.list();
    res.json(lista);
})));
//efetuar o Login
router.post("/login", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let ra = parseInt(req.body.ra_usuario);
    let senha = req.body.senha_usuario;
    let resp = yield Usuario.efetuarLogin(ra, senha);
    if (resp) {
        res.cookie("logged", true, { expires: false });
        res.cookie("ra_usuario", req.body.ra_usuario, { expires: false });
        res.json(true);
    }
    else {
        res.json(false);
    }
})));
router.get("/logout", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.clearCookie("logged");
    res.clearCookie("ra_usuario");
    res.redirect("/login");
})));
module.exports = router;
//# sourceMappingURL=usuario.js.map