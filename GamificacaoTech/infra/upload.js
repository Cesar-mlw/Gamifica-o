"use strict";
const multer = require("multer");
const fs = require("fs");
const FS = require("./fs");
module.exports = class Upload {
    static async gravarArquivoDeForm(expressRequest, expressResponse, caminhoRelativoPasta, nomeArquivo, tamanhoMaximoArquivoEmBytes, campoArquivoNoForm) {
        return new Promise((resolve, reject) => {
            let caminhoAbsolutoPasta;
            try {
                caminhoAbsolutoPasta = FS.gerarCaminhoAbsoluto(caminhoRelativoPasta);
            }
            catch (e) {
                reject("Caminho relativo inválido!");
                return;
            }
            if (!(nomeArquivo = FS.validarNomeDeArquivo(nomeArquivo))) {
                reject("Nome de arquivo inválido!");
                return;
            }
            let storage = multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, caminhoAbsolutoPasta);
                },
                filename: function (req, file, callback) {
                    callback(null, nomeArquivo);
                }
            });
            let upload = multer({
                storage: storage,
                limits: {
                    fieldNameSize: 255,
                    fieldSize: tamanhoMaximoArquivoEmBytes
                }
            }).single(campoArquivoNoForm);
            upload(expressRequest, expressResponse, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
    static async gravarArquivo(arquivo, caminhoRelativoPasta, nomeArquivo) {
        return new Promise((resolve, reject) => {
            let caminhoAbsolutoArquivo;
            try {
                caminhoAbsolutoArquivo = FS.gerarCaminhoAbsolutoArquivo(caminhoRelativoPasta, nomeArquivo);
            }
            catch (e) {
                reject("Caminho inválido!");
                return;
            }
            fs.writeFile(caminhoAbsolutoArquivo, arquivo.buffer, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    static async criarArquivoVazio(caminhoRelativoPasta, nomeArquivo) {
        return new Promise((resolve, reject) => {
            let caminhoAbsolutoArquivo;
            try {
                caminhoAbsolutoArquivo = FS.gerarCaminhoAbsolutoArquivo(caminhoRelativoPasta, nomeArquivo);
            }
            catch (e) {
                reject("Caminho inválido!");
                return;
            }
            try {
                fs.exists(caminhoAbsolutoArquivo, (exists) => {
                    if (exists) {
                        reject("Arquivo já existe!");
                        return;
                    }
                    fs.writeFile(caminhoAbsolutoArquivo, [], (err) => {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    static async criarArquivo(caminhoRelativoPasta, nomeArquivo, conteudo) {
        return new Promise((resolve, reject) => {
            let caminhoAbsolutoArquivo;
            try {
                caminhoAbsolutoArquivo = FS.gerarCaminhoAbsolutoArquivo(caminhoRelativoPasta, nomeArquivo);
            }
            catch (e) {
                reject("Caminho inválido!");
                return;
            }
            try {
                fs.exists(caminhoAbsolutoArquivo, (exists) => {
                    if (exists) {
                        reject("Arquivo já existe!");
                        return;
                    }
                    fs.writeFile(caminhoAbsolutoArquivo, conteudo, (err) => {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    static async adicionarAoFinalDoArquivo(arquivo, caminhoRelativoPasta, nomeArquivo) {
        return new Promise((resolve, reject) => {
            let caminhoAbsolutoArquivo;
            try {
                caminhoAbsolutoArquivo = FS.gerarCaminhoAbsolutoArquivo(caminhoRelativoPasta, nomeArquivo);
            }
            catch (e) {
                reject("Caminho inválido!");
                return;
            }
            try {
                fs.exists(caminhoAbsolutoArquivo, (exists) => {
                    if (!exists) {
                        reject("Arquivo inexistente!");
                        return;
                    }
                    fs.appendFile(caminhoAbsolutoArquivo, arquivo.buffer, (err) => {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
};
//# sourceMappingURL=upload.js.map