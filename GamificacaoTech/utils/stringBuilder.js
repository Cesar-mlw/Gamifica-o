"use strict";
module.exports = class StringBuilder {
    static bookSpiller(p, id) {
        let n1 = 0;
        let n2 = 0;
        let n3 = 0;
        n3 = Math.floor(p / 1550);
        p -= 1550 * n3;
        n2 = Math.floor(p / 450);
        p -= 450 * n2;
        n1 = Math.floor(p / 150);
        p -= 150 * n1;
        let respString = '<div class="book-pile" id="pile-' + id + '"><div class="book-group-1">';
        for (let i = 0; i < n1; i++) {
            respString += '<div class="book"></div>';
        }
        respString += '</div><div class="book-group-2">';
        for (let i = 0; i < n2; i++) {
            respString += '<div class="book"></div>';
        }
        respString += '</div><div class="book-group-3">';
        for (let i = 0; i < n3; i++) {
            respString += '<div class="book"></div>';
        }
        respString += '</div></div>';
        return respString;
    }
    static shelfPreviewSpiller(all, miss) {
        let res = "";
        let p = Math.ceil(all.length / 3);
        for (let i = 0; i < p; i++) {
            if (p - 1 == i) {
                let v = (i * 3) - all.length;
                if (v < 0)
                    v *= -1;
                if (v % 3 == 0)
                    v = 0;
                res += '<div class="estante-row-preview">';
                for (let j = 0; j < 3 - v; j++) {
                    if (this.contains(miss, all[i].id_achievement)) {
                        res += '<div class="estante-item-preview missing-achievement"></div>';
                    }
                    else {
                        res += '<div class="estante-item-preview" id="preview-achievement-' + i + '"></div>';
                    }
                }
                res += '</div>';
            }
            else if (i == 0) {
                res += '<div class="estante-row-preview">';
                for (let j = 0; j < 3; j++) {
                    if (this.contains(miss, all[i].id_achievement)) {
                        res += '<div class="estante-item-preview missing-achievement" id="preview-achievement-' + i + '"></div>';
                    }
                    else {
                        res += '<div class="estante-item-preview" id="preview-achievement-' + i + '"></div>';
                    }
                }
                res += '</div>';
            }
            else {
                res += '<div class="estante-row-preview">';
                for (let j = 0; j < 3; j++) {
                    if (this.contains(miss, all[i].id_achievement)) {
                        res += '<div class="estante-item-preview missing-achievement" id="preview-achievement-' + i + '"></div>';
                    }
                    else {
                        res += '<div class="estante-item-preview" id="preview-achievement-' + i + '"></div>';
                    }
                }
                res += '</div>';
            }
        }
        return res;
    }
    static itemBoxSpiller(items) {
        let res = "";
        for (let i = 0; i < items.length; i++) {
            res += '<button class="item-box-item" id="item-box-item-' + items[i].id_item_usuario + '" onclick="adicionarItem(' + items[i].id_item_usuario + ')"></button>';
        }
        return res;
    }
    static placedItemSpiller(items) {
        let res = "";
        for (let i = 0; i < items.length; i++) {
            res += `<div class="objdrag room-object" id="item-${items[i].id_item_usuario}" data-id="${items[i].id_item_usuario}" style="position:absolute;left:${(items[i].cellx_item) * 80}px;top:${(items[i].celly_item) * 80}px; background:url(${items[i].img_url_item}); width:${(items[i].width) * 80}px; height:${(items[i].height) * 80}px"></div>`;
        }
        return res;
    }
    static shelfSpiller(all, miss) {
        let res = "";
        let p = Math.ceil(all.length / 3);
        for (let i = 0; i < p; i++) {
            if (p - 1 == i) {
                let v = (i * 3) - all.length;
                if (v < 0)
                    v *= -1;
                if (v % 3 == 0)
                    v = 0;
                res += '<div class="estante-body-bottom"><div class="estante-row">';
                for (let j = 0; j < 3 - v; j++) {
                    if (this.contains(miss, all[i].id_achievement)) {
                        res += '<div class="estante-item missing-achievement" id="achievement-' + i + '"></div>';
                    }
                    else {
                        res += '<div class="estante-item" id="achievement-' + i + '"></div>';
                    }
                }
                res += '</div></div>';
            }
            else if (i == 0) {
                res += '<div class="estante-body-top"><div class="estante-row">';
                for (let j = 0; j < 3; j++) {
                    if (this.contains(miss, all[i].id_achievement)) {
                        res += '<div class="estante-item missing-achievement" id="achievement-' + i + '"></div>';
                    }
                    else {
                        res += '<div class="estante-item" id="achievement-' + i + '"></div>';
                    }
                }
                res += '</div></div>';
            }
            else {
                res += '<div class="estante-body-bottom"><div class="estante-row">';
                for (let j = 0; j < 3; j++) {
                    if (this.contains(miss, all[i].id_achievement)) {
                        res += '<div class="estante-item missing-achievement" id="achievement-' + i + '"></div>';
                    }
                    else {
                        res += '<div class="estante-item" id="achievement-' + i + '"></div>';
                    }
                }
                res += '</div></div>';
            }
        }
        return res;
    }
    static storeItemSpiller(item) {
        let res = "";
        for (let i = 0; i < item.length; i++) {
            res += `<li class="bcl-item" id="loja-item-${item[i].id_item}">
            <div class="bcl-item-body">
                <img src=${item[i].img_url_item}>
            </div>
            <div class="bcl-item-header">
                <div class="bcl-title">Item ${item[i].id_item}</div>
                <button class="mdc-icon-button material-icons" onclick="buyItem(${item[i].id_item})">monetization_on</button>
                <div class="item-price">${item[i].preco_item}</div>
            </div>
        </li>`;
        }
        return res;
    }
    static projectSpiller(projects) {
        let res = "";
        console.log(projects);
        for (let i = 0; i < projects.length; i++) {
            let startingDate = projects[i].dt_comeco_projeto;
            let startingDateString = String(startingDate.getDate()).padStart(2, '0') + "/" + String(startingDate.getMonth() + 1).padStart(2, '0') + "/" + startingDate.getFullYear();
            console.log(startingDateString);
            if (projects[i].dt_termino_projeto != null) {
                let terminoDate = projects[i].dt_termino_projeto;
                let terminoDateString = String(terminoDate.getDate()).padStart(2, '0') + "/" + String(terminoDate.getMonth() + 1).padStart(2, '0') + "/" + terminoDate.getFullYear();
            }
            res += `<li class="port-item" data-id="${projects[i].id_projeto}">
            <div class="port-item-upper">
                <div class="port-submit-date">${startingDateString}</div>
                <span class="speech-bubble-tri"></span>
            </div>
            <div class="port-item-lower">
                <div class="port-item-header">
                    <img  class="port-item-pic" src="https://cdn.glitch.com/project-avatar/92d725da-5ec6-467d-959f-79cf20b8b93c.png?2016-12-15T20:01:33.811Z" alt="">
                    <div class="port-item-title">${projects[i].nome_projeto}</div>
                </div>
                <div class="port-item-desc">
                    <div class="port-desc-text">
                        ${projects[i].descricao_projeto}
                    </div>
                </div>
            </div>
            <div class="port-item-edit-addon">
                <button class="port-item-edit-button" onclick="editarPortItem(${projects[i].id_projeto})">Edit Project</button>
            </div>
        </li>`;
        }
        return res;
    }
    static areaSpiller(areas) {
        let res = "";
        for (let i = 0; i < areas.length; i++) {
            res += `<option value="${areas[i].id_area}">${areas[i].nome_area}</option>`;
        }
        return res;
    }
    static tipoProjetoSpiller(tipoProjetos) {
        let res = "";
        for (let i = 0; i < tipoProjetos.length; i++) {
            res += `<option value="${tipoProjetos[i].id_tipo_projeto}">${tipoProjetos[i].nome_tipo_projeto}</option>`;
        }
        return res;
    }
    static tipoHabilidadeSpiller(tipoHabilidade) {
        let res = "";
        for (let i = 0; i < tipoHabilidade.length; i++) {
            res += `<option value="${tipoHabilidade[i].id_tipo_habilidade}">${tipoHabilidade[i].nome_tipo_habilidade}</option>`;
        }
        return res;
    }
    static contains(array, item) {
        let resp = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id_achievement == item)
                resp = true;
        }
        return resp;
    }
};
//# sourceMappingURL=stringBuilder.js.map