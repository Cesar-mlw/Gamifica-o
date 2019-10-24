

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
        console.log('n3 -> ' + n3 + ' n2 -> ' + n2 + ' n1 -> ' + n1);
        let respString = '<div class="book-pile" id="pile-'+id+'"><div class="book-group-3">'
        for(let i = 0; i < n3; i++){
            respString += '<div class="book"></div>'
        }
        respString += '</div><div class="book-group-2">'
        for(let i = 0; i < n2; i++){
            respString += '<div class="book"></div>'
        }
        respString += '</div><div class="book-group-1">'
        for(let i = 0; i < n1; i++){
            respString += '<div class="book"></div>'
        }
        respString += '</div></div>'

        return respString
    }
}