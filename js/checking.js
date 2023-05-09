/*
Grupo: 39
PL: 21
60241 Dário Lopes Batista 
56791 Diogo Simas do Espírito Santo 
60237 Rafael Tomé
*/

"use strict"
// Algoritmo para verificar se existem jogadas possíveis

function checkMoves1(table, x, y){
    // Verifica se é possivel juntar as jóias no seguinte caso:
    // 💠 -> pivot (jóia x, y)
    // 🔷 -> jóia da mesma cor do pivot
    // 🔶 -> jóia de cor diferente do pivot
    // ?  -> jóia de cor desconhecida
    //--------------------------------------------------------
    //   ?        ?  
    // ? 🔶 🔷 💠 🔶 ?
    //   ?        ?
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
    // Função que verifica horizontalmente se podem
    // ser feitos alguns movimentos válidos
    // Retorna true se sim, false se não
    let lastColors = []
    for (let i = 0; i < lines.length; i++) {
        const row = lines[i];
        lastColors = [ null, row[0].color ]
        for (let a = 1; a < row.length; a++) {
            const jewel = row[a];
            if (jewel.color == lastColors[1]) {
                if (checkMoves1(lines, a, i)){ return true }
                else {
                    lastColors = [lastColors[1], jewel.color]
                }
            } else if (jewel.color == lastColors[0]) {
                if (checkMoves2(lines, a, i)){ return true }
                else {
                    lastColors = [lastColors[1], jewel.color]
                }
            }
            else { lastColors = [lastColors[1], jewel.color] }
        }
    }
    return false
}

function checkPossible(table)
// Verifica se podem ser feito algum movimento válido
{
    let horizlines = table

    // Criar um array de todas as linhas vericais
    let vertlines = getVertLines(table)

    return checkLines(horizlines) || checkLines(vertlines)
}
