function checkExistance(table, x, y)
{
    // Retorna um valor booleano representando se a peça
    // em posição x,y existe ou não
    if (typeof table[y] == "undefined") { return false }
    else if ( typeof table[y][x] == "undefined" ) {return false}
    else { return true }
}

function checkMoves1(table, x, y){
    // Verifica se é possivel juntar as jóias no seguinte caso:
    // 💠 -> pivot (jóia x, y)
    // 🔷 -> jóia da mesma cor do pivot
    // ?  -> jóia de cor desconhecida
    //--------------------------------------------------------
    //    ?  ?
    // ? 🔷  💠 ?
    //   ?   ?
    let color = table[y][x].color
    return (
        (checkExistance(table, y, x+2) &&
        color == table[y][x+2].color) ||
        (checkExistance(table, y+1, x+1) &&
        color == table[y+1][x+1].color) ||
        (checkExistance(table, y-1, x+1) &&
        color == table[y-1][x+1].color) ||
        (checkExistance(table, y, x-3) &&
        color == table[y][x-3].color) ||
        (checkExistance(table, y-1, x-2) &&
        color == table[y-1][x-2].color) ||
        (checkExistance(table, y+1, x-2) &&
        color == table[y+1][x-2].color)
    )
}

function checkMoves2(table, x, y){
    // Verifica se é possivel juntar as jóias no seguinte caso:
    // 💠 -> pivot (jóia x, y)
    // 🔷 -> jóia da mesma cor do pivot
    // 🔶 -> jóia de cor diferente do pivot
    // ?  -> jóia de cor desconhecida
    // ?  -> jóia de cor desconhecida
    //--------------------------------------------------------
    //     ? 
    //  🔷 🔶 💠
    //     ? 
    let color = table[y][x].color
    return (
        (checkExistance(table, y+1, x-1) &&
        color == table[y+1][x-1].color) ||
        (checkExistance(table, y-1, x-1) &&
        color == table[y-1][x-1].color)
    )
}

function checkLines(lines){
    // Função que verifica as linhas do
    let lastColors = []
    for (let i = 0; i < lines.length; i++) {
        const row = lines[i];
        lastColors = [ null, row[0].color ]
        for (let a = 1; a < row.length; a++) {
            const jewel = row[a];
            if (jewel.color == lastColors[1]) {
                if (checkMoves1(lines, a, i)){ return true }
                else {
                    lastColors = [ lastColors[1], jewel.color]
                }
            } else if (jewel.color == lastColors[0]) {
                if (checkMoves2(lines, a, i)){ return true }
                else {
                    lastColors = [ lastColors[1], jewel.color]
                }
            }
            else { lastColors = [ lastColors[1], jewel.color] }
        }
    }
    return false
}

function checkPossible(table)
// Checks if there are any more valid moves avaliable
{
    let horizlines = table

    // Criar um array de todas as linhas vericais
    let vertlines = getVertLines(table)

    return checkLines(horizlines) || checkLines(vertlines)
}

