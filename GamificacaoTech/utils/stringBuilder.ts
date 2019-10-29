import Achievement = require("../models/Achievement")
import AchievementUsuario = require("../models/AchievementUsuario")


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
    public static shelfSpiller(all: Achievement[], miss: Achievement[], hit: AchievementUsuario[]): string{
        let res = ""
        let p = Math.ceil(all.length / 3)
        let counter = 0
        for(let i = 0; i < p; i++){
            if(p - 1 == i){
                let v = (i*3) - all.length
                if(v < 0) v*=-1
                res += '<div class="estante-body-bottom"><div class="estante-row">'
                for(let j = 1; j < 3 - v; j++){
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
        }
        return res
    }
}