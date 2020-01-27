import Achievement = require("../models/Achievement")
import AchievementUsuario = require("../models/AchievementUsuario")
import ItemUsuario = require("../models/ItemUsuario")
import ItemItemUsuario = require("../models/ItemItemUsuarioJoin")
import Item = require("../models/Item")
import { CLIENT_RENEG_LIMIT } from "tls"


export = class StringBuilder {
    public static bookSpiller(p: number, id: number): string{
        let n1 = 0
        let n2 = 0
        let n3 = 0

        n3 = Math.floor(p/1550)
        p -= 1550*n3
        n2 = Math.floor(p/450)
        p -= 450*n2
        n1 = Math.floor(p/150)
        p -= 150*n1
        let respString = '<div class="book-pile" id="pile-'+id+'"><div class="book-group-1">'
        for(let i = 0; i < n1; i++){
            respString += '<div class="book"></div>'
        }
        respString += '</div><div class="book-group-2">'
        for(let i = 0; i < n2; i++){
            respString += '<div class="book"></div>'
        }
        respString += '</div><div class="book-group-3">'
        for(let i = 0; i < n3; i++){
            respString += '<div class="book"></div>'
        }
        respString += '</div></div>'

        return respString
    }
    public static shelfPreviewSpiller(all: Achievement[], miss: Achievement[]): string{
        let res = ""
        let p = Math.ceil(all.length / 3)
        let counter = 0
        for(let i = 0; i < p; i++){
            if(p - 1 == i){
                let v = (i*3) - all.length
                if(v < 0) v*=-1
                if(v % 3 == 0) v = 0
                res += '<div class="estante-row-preview">'
                for(let j = 0; j < 3 - v; j++){
                    if(miss.includes(all[counter])){
                        res+= '<div class="estante-item-preview missing-achievement"></div>'
                        counter++
                    }
                    else{
                        res+= '<div class="estante-item-preview" id="preview-achievement-'+counter+'"></div>'
                        counter++
                    }
                    
                }
                res += '</div>'
            }
            else if(i == 0){
                res += '<div class="estante-row-preview">'
                for(let j = 0; j < 3; j++){
                    if(miss.includes(all[counter])){
                        res+= '<div class="estante-item-preview missing-achievement" id="preview-achievement-'+counter+'"></div>'
                        counter++
                    }
                    else{
                        res+= '<div class="estante-item-preview" id="preview-achievement-'+counter+'"></div>'
                        counter++
                    }
                }
                res += '</div>'
            }
            else{
                res+= '<div class="estante-row-preview">'
                for(let j = 0; j < 3; j++){
                    if(miss.includes(all[counter])){
                        res+= '<div class="estante-item-preview missing-achievement" id="preview-achievement-'+counter+'"></div>'
                        counter++
                    }
                    else{
                        res+= '<div class="estante-item-preview" id="preview-achievement-'+counter+'"></div>'
                        counter++
                    }
                }
                res += '</div>'
            }
        }
        return res
    }

    public static itemBoxSpiller(items: ItemUsuario[]): string{
        let res = ""
        for(let i = 0; i < items.length; i++){
            res += '<button class="item-box-item" id="item-box-item-'+items[i].id_item_usuario+'" onclick="adicionarItem('+items[i].id_item_usuario+')"></button>'
        }
        return res
    }

    public static placedItemSpiller(items: ItemItemUsuario[]): string {
        let res = ""
        for(let i = 0; i < items.length; i++){
            res += `<div class="objdrag room-object" id="item-${items[i].id_item_usuario}" data-id="${items[i].id_item_usuario}" style="position:absolute;left:${(items[i].cellx_item)*80}px;top:${(items[i].celly_item)*80}px; background:url(${items[i].img_url_item}); width:${(items[i].width)*80}px; height:${(items[i].height)*80}px"></div>`
        }
        return res
    }

    public static shelfSpiller(all: Achievement[], miss: Achievement[]): string{
        let res = ""
        let p = Math.ceil(all.length / 3)
        let counter = 0
        for(let i = 0; i < p; i++){
            if(p - 1 == i){ 
                let v = (i*3) - all.length
                if(v < 0) v*=-1
                if(v % 3 == 0) v = 0
                res += '<div class="estante-body-bottom"><div class="estante-row">'
                for(let j = 0; j < 3 - v; j++){
                    console.log(all.includes(miss[counter]))
                    if(miss.includes(all[counter])){
                        res+= '<div class="estante-item missing-achievement" id="achievement-'+counter+'"></div>'
                        counter++
                    }
                    else{
                        res+= '<div class="estante-item" id="achievement-'+counter+'"></div>'
                        counter++
                    }
                    
                }
                res += '</div></div>'
            }
            else if(i == 0){
                res += '<div class="estante-body-top"><div class="estante-row">'
                for(let j = 0; j < 3; j++){
                    if(miss.includes(all[counter])){
                        res+= '<div class="estante-item missing-achievement" id="achievement-'+counter+'"></div>'
                        counter++
                    }
                    else{
                        res+= '<div class="estante-item" id="achievement-'+counter+'"></div>'
                        counter++
                    }
                }
                res += '</div></div>'
            }
            else{
                res+= '<div class="estante-body-bottom"><div class="estante-row">'
                for(let j = 0; j < 3; j++){
                    if(all.includes(miss[counter])){
                        res+= '<div class="estante-item missing-achievement" id="achievement-'+counter+'"></div>'
                        counter++
                    }
                    else{
                        res+= '<div class="estante-item" id="achievement-'+counter+'"></div>'
                        counter++
                    }
                }
                res += '</div></div>'
            }
        }
        return res
    }

    public static storeItemSpiller(item: Item[]): string {
        let res: string = ""
        for(let i = 0; i < item.length; i++){
            res+= `<li class="bcl-item">
            <div class="bcl-item-body">
                <img src=${item[i].img_url_item}>
            </div>
            <div class="bcl-item-header">
                <div class="bcl-title">Item ${item[i].id_item}</div>
                <button class="mdc-icon-button material-icons" onclick="">monetization_on</button>
                <div class="item-price">${item[i].preco_item}</div>
            </div>
        </li>`
        }

        return res
    }
}