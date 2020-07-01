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
const Usuario = require("../../models/Usuario");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let u = req.body;
    let erro = yield Usuario.create(u);
    if (erro) {
        res.status(400).send({ status: "error", message: erro });
    }
    else {
        res.status(200).send({ status: "success", message: `User ${u.ra_usuario} created!` });
    }
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Usuario.update(p);
    console.log(erro);
    if (erro) {
        res.status(404).send({ status: "error", message: `User ${p.ra_usuario} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `User ${p.ra_usuario} altered!` });
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let u = yield Usuario.read(ra);
    res.json(u);
})));
router.post("/readUserCoins", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let u = yield Usuario.readUserCoins(ra);
    res.json(u);
})));
router.post("/readUserPoints", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield Usuario.readUserPoints(ra);
    res.json(p);
})));
//criar rota delete
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let u = yield Usuario.delete(ra);
    if (u == false) {
        res.status(404).send({ status: "error", message: `User ${ra} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `User ${ra} deleted` });
    }
})));
//criar rota listar
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield Usuario.list();
    res.json(lista);
})));
//efetuar o Login
router.post("/login", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = parseInt(req.body.ra_usuario);
    let senha = req.body.senha_usuario;
    let resp;
    let user;
    if (isNaN(ra)) {
        res.status(401).send({ status: "error", message: "Only Numbers are accepted on this field" });
    }
    else {
        resp = yield Usuario.efetuarLogin(ra, senha);
        user = yield Usuario.userIsAdmin(ra);
        if (resp) {
            res.cookie("logged", true, { expires: false });
            res.cookie("ra_usuario", req.body.ra_usuario, { expires: false });
            res.status(200).send({ status: "success", message: `Welcome ${ra}`, isAdmin: user });
        }
        else {
            res.status(401).send({ status: "error", message: `User not found for the RA ${ra}` });
        }
    }
})));
router.get("/logout", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("logged");
    res.clearCookie("ra_usuario");
    res.redirect("/login");
})));
module.exports = router;
//# sourceMappingURL=usuario.js.map