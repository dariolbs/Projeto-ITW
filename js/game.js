/*
Grupo: 39
PL: 21
60241 Dário Lopes Batista 
56791 Diogo Simas do Espírito Santo 
60237 Rafael Tomé
*/

"use strict"

// Todas as cores disponíveis
const COLORS = [
    "blue",
    "red",
    "yellow",
    "purple",
    "orange",
    "green",
    "white"
]

// Quantidade de pontos ganha por jóia destruida
const POINTS_PER_JEWEL = 10

// Declarar variáveis que serão usadas na função inicial

let blocks
let blocks_per_row
let table = []
let block_table = []
let buffer = null

//Classes
/* Classe de uma jóia. Apenas é necessária uma cor */

class DivBlock {
    // Classe de um bloco na caixa do jogo
    // type -> valor booleano (true ou false) (branco ou sem cor)
    // rownumber -> número de rows da caixa do jogo
    // x -> posição x do bloco
    // y -> posição y do bloco
    constructor(type, rownumber, x, y)
    {
        this.type = type;
        this.size = 100 / rownumber + "%"
        this.div = document.createElement("div");
        this.div.setAttribute("onclick", "moveJewel(" + x + "," + y + ")");
        this.div.style.width = this.size
        this.div.style.height = this.size;
        //this.div.onclick = moveJewel(self.x, self.y);
        if (!type) {
            this.div.setAttribute("class", "transparent_block block");
        } else {
            this.div.setAttribute("class", "white_block block");
        };
    }
}

class Jewel {
    // Classe de uma jóia. Requer uma cor apenas
    constructor(color)
    {
        if (color === null) {
            this.color = null;
            this.image = document.createElement("img");
            this.image.setAttribute("class", "jewel");
        }
        else {
            this.color = color;
            this.image = document.createElement("img");
            this.image.setAttribute("src", "imagens/joias/" + color + "-gem.webp");
            this.image.setAttribute("class", "jewel");
        }
    }
}

class Player {
    // Classe de um jogador. Requer nome
    constructor(name)
    {
        this.name = name;
        this.points = 0;
    }
}

function addPoints(add, player) {
    player.points += add
}

function isPair(number) {
    // Retorna um valor booleano que representa se o número é ou não par
    if (number%2) { return true }
    else { return false }
}

function createGameBox(rn, id) {
    // Creates the game box based on the number of rows "rn"
    gamebox = document.getElementById(id)
    for (let i = 0; i < rn; i++)
    {
        // Create a table of blocks
        block_table.push([])
        for (let a = 0 + i; a < rn + i; a++) {
            const new_block = new DivBlock(isPair(a), rn, a - i, i);
            gamebox.appendChild(new_block.div);
            block_table[i].push(new_block.div);
        }
    }
}

function createTable() {
    // Cria a tabela de acordo com o número de divisões em "#gamebox"
    table = []
    for (let i = 0; i < blocks_per_row; i++) {
        const element = i;
        table.push([])
        for (let a = 0; a < blocks_per_row; a++) {
            table[element].push(null);
        }
    }
    return table
}

function baralhar(table) {
    /* Função de baralhar
    * Baralha as jóais no tabuleiro */
    let random_n = 0
    for (let i = 0; i < blocks_per_row; i++) {
            const element = i;
        for (let a = 0; a < blocks_per_row; a++) {
            random_n = getRandomInt(COLORS.length)
            table[element][a] = new Jewel(COLORS[random_n])
        }
    }
}

// Função que desenha a tabela no website
function drawTable(table, blocks, first = false)
{
    let n = 0
    for (let i = 0; i < table.length; i++) {
        const line = table[i];
        for (let a = 0; a < line.length; a++) {
            const block = line[a]
            if (!first) {
                blocks[n].removeChild(blocks[n].firstChild)
            }
            blocks[n].appendChild(block.image)
            n += 1
        }
    }
}

async function flash(x, y){
    // Flashes the blocks around the position x, y
    highlight(x,y);
    await sleep(80);
    deHighlight(x,y)
    await sleep(80);
    highlight(x,y);
    await sleep(80);
    deHighlight(x,y)
    await sleep(80);
    highlight(x,y);
    await sleep(80);
    deHighlight(x,y)
    await sleep(80);
}

function highlight(x, y) {
    // Sinaliza todos os blocos que a jóia em posição x,y pode se mover
    if (checkExistance(table, x+1, y))
    { block_table[y][x+1].setAttribute("class", "highlighted_block block"); }
    if (checkExistance(table,x-1, y))
    { block_table[y][x-1].setAttribute("class", "highlighted_block block"); }
    if (checkExistance(table, x, y-1))
    { block_table[y-1][x].setAttribute("class", "highlighted_block block"); }
    if (checkExistance(table,x , y+1))
    { block_table[y+1][x].setAttribute("class", "highlighted_block block"); }
}

function deHighlight(x, y) {
    // Remove a sinalização nas jóias por volta de x,y
    if (typeof block_table[y][x+1] != "undefined")
    {
        if (isPair(y+x)){
        block_table[y][x+1].setAttribute("class", "transparent_block block");
        } else {
        block_table[y][x+1].setAttribute("class", "white_block block");
        }
    }
    if (typeof block_table[y][x-1] != "undefined")
    {
        if (isPair(y+x)){
        block_table[y][x-1].setAttribute("class", "transparent_block block");
        } else {
        block_table[y][x-1].setAttribute("class", "white_block block");
        }
    }
    if (typeof block_table[y-1] != "undefined")
    {
        if (isPair(y+x)){
        block_table[y-1][x].setAttribute("class", "transparent_block block");
        } else {
        block_table[y-1][x].setAttribute("class", "white_block block");
        }
    }
    if (typeof block_table[y+1] != "undefined")
    {
        if (isPair(y+x)){
        block_table[y+1][x].setAttribute("class", "transparent_block block");
        } else {
        block_table[y+1][x].setAttribute("class", "white_block block");
        }
    }
}

function checkExistance(table, x, y)
{
    // Retorna um valor booleano representando se a peça
    // em posição x,y existe ou não
    if (typeof table[y] == "undefined") { return false }
    else if ( typeof table[y][x] == "undefined" ) {return false}
    else { return true }
}

function checkVertical(vertlines, remove = true, player = null) {
    let element_buffer = [];
    let coordinates = [];
    let changed = false
    for (let x = 0; x < vertlines.length; x++) {
        for (let y = 0; y < vertlines.length; y++) {
            const element = vertlines[x][y]
            if (element_buffer.length === 0) {
                element_buffer.push(element)
                coordinates.push([x, y])
            }
            else if (element_buffer.length >= 3 && (element.color !== element_buffer[0].color || (x === vertlines.length - 1 && element.color === element_buffer[0].color))) {
                for (let i = 0; i < coordinates.length; i++) {
                    const y = coordinates[i][0];
                    const x = coordinates[i][1];
                    if (remove) {removeJewel(x, y); }
                    if (player) { addPoints(POINTS_PER_JEWEL ,player) }
                }
                changed = true
                element_buffer.length = 0
                coordinates.length = 0            
            }
            else if (y === vertlines.length - 1 && element_buffer.length >= 2 && element.color === element_buffer[0].color) {
                element_buffer.push(element)
                coordinates.push([x, y])
                for (let i = 0; i < coordinates.length; i++) {
                    const y = coordinates[i][0];
                    const x = coordinates[i][1];
                    if (remove) {removeJewel(x, y); }
                    if (player) { addPoints(POINTS_PER_JEWEL ,player) }
                }
                changed = true
                element_buffer.length = 0
                coordinates.length = 0            
            }
            else if (element_buffer.length < 3 && element.color !== element_buffer[0].color) {
                element_buffer.length = 0
                coordinates.length = 0            
                element_buffer.push(element)
                coordinates.push([x, y])
            }
            else if (element.color === element_buffer[0].color) {
                element_buffer.push(element)
                coordinates.push([x, y])  
            }

        }
    element_buffer.length = 0
    coordinates.length = 0
    }
    return changed
}

function checkHorizontal(horizlines, remove = true, player = null) {
    let element_buffer = [];
    let coordinates = [];
    let changed = false
    for (let y = 0; y < horizlines.length; y++) {
        for (let x = 0; x < horizlines.length; x++) {
            const element = horizlines[y][x]
            if (element_buffer.length === 0) {
                element_buffer.push(element)
                coordinates.push([x, y])
            }
            else if (element_buffer.length >= 3 && (element.color !== element_buffer[0].color)) {
                for (let i = 0; i < coordinates.length; i++) {
                    const y = coordinates[i][0];
                    const x = coordinates[i][1];
                    if (remove) {removeJewel(x, y); }
                    if (player) { addPoints(POINTS_PER_JEWEL ,player) }
                }
                changed = true
                element_buffer.length = 0
                coordinates.length = 0            
            }
            else if (x === horizlines.length - 1 && element_buffer.length >= 2 && element.color === element_buffer[0].color) {
                element_buffer.push(element)
                coordinates.push([x, y])
                for (let i = 0; i < coordinates.length; i++) {
                    const y = coordinates[i][0];
                    const x = coordinates[i][1];
                    if (remove) {removeJewel(x, y); }
                    if (player) { addPoints(POINTS_PER_JEWEL ,player) }
                }
                changed = true
                element_buffer.length = 0
                coordinates.length = 0            
            }
            else if (element_buffer.length < 3 && element.color !== element_buffer[0].color) {
                element_buffer.length = 0
                coordinates.length = 0            
                element_buffer.push(element)
                coordinates.push([x, y])
            }
            else if (element.color === element_buffer[0].color) {
                element_buffer.push(element)
                coordinates.push([x, y])  
            }

        }
    element_buffer.length = 0
    coordinates.length = 0
}
    return changed
}

function refill(table) {
    // Repõe os espaços vazios no jogo
    let random_n = 0
    for (let i = 0; i < table.length; i++) {
        const row = table[i]
        for (let a = 0; a < row.length; a++) {
            const jewel = row[a]
            if (jewel.color == null) {
                random_n = getRandomInt(COLORS.length)
                table[i][a] = new Jewel(COLORS[random_n])
            }
        }
}
}

// ?
function slideRow(table, ncol){
    vlines = getVertLines(table)
    vlines[ncol]
}

function slideJewel(table)
// Desliza as jóias para baixo caso haja espaços vazios
{
    for (let i = 0; i < table.length; i++) {
        const row = table[i]
        for (let a = 0; a < row.length; a++) {
            const element = row[a]
            if (element.color === null) {
                for (let b = i; b >= 1; b--) {
                    swapJewel(table, a, b, a, b-1)
                }
            }
        }
    }
}

/* Função que verifica e remove jóias que estão alinhadas
vericalmente ou horizontalmente com outras 3 ou mais */
function checkTable(table, remove = true, player = null) {

    let horizlines = table
    let changed = false

    // Criar um array de todas as linhas vericais
    let vertlines = getVertLines(table)
    changed = checkVertical(vertlines, remove, player) ||
        checkHorizontal(horizlines, remove, player)

    // Retorna um valor booleano a undicar se a tabela mudou ou não
    return changed
}

/** Função swapJewel
    Troca a jóia em posição x,y pela jóia em posição nx,ny */

function swapJewel(table, x, y, nx, ny)
{
    // Troca a jóia em posição x,y pela nx, ny
    let sel_color = table[y][x].color
    let rep_color = table[ny][nx].color
    table[y][x] = new Jewel(rep_color)
    table[ny][nx] = new Jewel(sel_color)
};

function removeJewel(x, y)
{
    // Altera a cor da jóia na posição x, y para null
    table[x][y] = new Jewel(null)
    sound();    // sons maiores quando há mais jóias eliminadas
};

function getVertLines(table) {
    // Obter as linhas verticais da tabela
    let vertlines = [];
    for (let i = 0; i < table.length; i++) {
        vertlines.push([])
        for (let a = 0; a < table.length; a++) {
            vertlines[i].push(table[a][i])
        }
    }
    return vertlines
}


function modulo(x){
    // Função módulo, retorna o módulo do número "x"
    if (x < 0) { return - x }
    else { return x }
};

function checkPlacement(table, x, y, nx, ny){
    // Verifica se a jóia pode ser movida desde x,y até nx, ny
    let isclose = ((modulo(nx-x) == 1) && (modulo(ny-y) == 0) ||
        (modulo(nx-x) == 0) && (modulo(ny-y) == 1))
    swapJewel(table, x, y, nx, ny)
    let changes = checkTable(table, false)
    swapJewel(table, nx, ny, x, y)
    return isclose && changes
}

async function transition(table, blocks){
    // Fazer uma transição sempre que algo acontecer no jogo
    drawTable(table, blocks);
    await sleep(110)
}

async function moveJewel(x, y)
{
    if (!buffer) {
        // Criar um buffer para ser usado no próximo clique
        buffer = [x, y];
        highlight(x,y);
    }
    else
    {
        let game_over = false
        // Obter cordenadas da jóia antiga
        let buf_x = buffer[0];
        let buf_y = buffer[1];
        deHighlight(buf_x,buf_y);
        // Verificar se a jóia pode ser movida para a posição nova
        //if ( (modulo(x-buf_x) == 1 && modulo(y-buf_y) == 0) ||
        //(modulo(x-buf_x) == 0 && modulo(y-buf_y) == 1)){
        if (checkPlacement(table, buf_x, buf_y, x, y)){
        // Trocar as jóias e desenhar a tabela nova
            swapJewel(table, buf_x, buf_y, x, y);
            await transition(table, blocks)
            // Eliminar jóias em conjunto
            while (checkTable(table) != false){
            // Verifica que não existem 3 ou mais jóias em conjunto
                await transition(table, blocks)
                slideJewel(table);
                await transition(table, blocks)
                refill(table);
            }
            drawTable(table, blocks);
            // Verificar se o jogo acabou
            game_over = (!checkPossible(table))
        } else { flash(buf_x, buf_y)}
        // Apagar o buffer e a sinalização
        buffer = null;
    };
};


// Função inicial
window.onload = startup
function startup() {

    createGameBox(BOARD_SIZE, "gamebox")

    // Encontrar o tamanho do tabuleiro
    blocks = document.getElementsByClassName("block");
    blocks_per_row = BOARD_SIZE //Math.sqrt(blocks.length)

    // Cria Array da Tabela
    table = createTable();

    // Randomiza as jóias e desenha a tabela
    baralhar(table);
    while (checkTable(table) != false){
    // Verifica que não existem 3 ou mais jóias em conjunto
        slideJewel(table)
        refill(table)
    }
    drawTable(table, blocks, true);
}
