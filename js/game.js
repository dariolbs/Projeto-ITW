/*
Grupo: 39
PL: 21
60241 Dário Lopes Batista 
56791 Diogo Simas do Espírito Santo 
60237 Rafael Tomé
*/

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

function isPair(number) {
    // Retorna um valor booleano que representa se o número é ou não par
    if (number%2) { return true }
    else { return false }
}

function createGameBox(rn) {
    // Creates the game box based on the number of rows "rn"
    gamebox = document.getElementById("gamebox")
    for (let i = 0; i < rn; i++)
    {
        // Create a table of blocks
        block_table.push([])
        for (let a = 0 + i; a < rn + i; a++) {
            new_block = new DivBlock(isPair(a), rn, a - i, i);
            gamebox.appendChild(new_block.div);
            block_table[i].push(new_block.div);
        }
    }
}

// Criar tabela de acordo com dimensões atuais da caixa do jogo
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
}

// !!!
// Necessário uma versão da função que não deixe 3 jóias juntas
function baralhar() {
    /* Função de baralhar
    * Baralha as jóais no tabuleiro */
    for (let i = 0; i < blocks_per_row; i++) {
            const element = i;
        for (let a = 0; a < blocks_per_row; a++) {
            random_n = getRandomInt(COLORS.length)
            table[element][a] = new Jewel(COLORS[random_n])
        }
    }
}

// Função que desenha a tabela no website
function drawTable(first = false)
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
    checkTable(table)
}

function signal(x, y) {
    // Sinaliza todos os blocos que a jóia em posição x,y pode se mover
    if (typeof block_table[y][x+1] != "undefined")
    {
        block_table[y][x+1].setAttribute("class", "signaled_block block");
    }
    if (typeof block_table[y][x-1] != "undefined")
    {
        block_table[y][x-1].setAttribute("class", "signaled_block block");
    }
    if (typeof block_table[y-1] != "undefined")
    {
        block_table[y-1][x].setAttribute("class", "signaled_block block");
    }
    if (typeof block_table[y+1] != "undefined")
    {
        block_table[y+1][x].setAttribute("class", "signaled_block block");
    }
}

function deSignal(x, y) {
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

function checkVertical(vertlines) {
    let element_buffer = [];
    let coordinates = [];
    for (let x = 0; x < vertlines.length; x++) {
        for (let y = 0; y < vertlines.length; y++) {
            element = vertlines[x][y]
            if (element_buffer.length === 0) {
                element_buffer.push(vertlines[x][y])
                coordinates.push([x, y])
            }
            else if (element_buffer.length >= 3 && element.color !== element_buffer[0].color) {
                for (let i = 0; i < coordinates.length; i++) {
                    const y = coordinates[i][0];
                    const x = coordinates[i][1];
                    removeJewel(x, y);                    
                }
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
}

function checkHorizontal(horizlines) {
    // POR FAZER
}

/** POR FAZER
Função que verifica e remove jóias que estão alinhadas
vericalmente ou horizontalmente com outras 3 ou mais */
function checkTable(table) {

    let horizlines = table

    // Criar um array de todas as linhas vericais

    let vertlines = [];
    for (let i = 0; i < table.length; i++) {
        vertlines.push([])
        for (let a = 0; a < table.length; a++) {
            vertlines[i].push(table[a][i])
        }
    }
    checkVertical(vertlines)
    checkHorizontal(horizlines)
}

/** Função swapJewel
    Troca a jóia em posição x,y pela jóia em posição nx,ny */

function swapJewel(x, y, nx, ny)
{
    // Troca a jóia em posição x,y pela nx, ny
    sel_color = table[y][x].color
    rep_color = table[ny][nx].color
    table[y][x] = new Jewel(rep_color)
    table[ny][nx] = new Jewel(sel_color)
    checkTable(table)
};

function removeJewel(x, y)
{
    // Altera a cor da jóia na posição x, y para null
    table[x][y] = new Jewel(null)
};


function modulo(x){
    // Função módulo, retorna o módulo do número "x"
    if (x < 0) { return -x }
    else { return x }
};

function moveJewel(x, y)
{
    if (!buffer) {
        // Criar um buffer para ser usado no próximo clique
        buffer = [x, y];
        signal(x,y);
    }
    else
    {
        // Obter cordenadas da jóia antiga
        buf_x = buffer[0];
        buf_y = buffer[1];
        // Verificar se a jóia pode ser movida para a posição nova
        if ( (modulo(x-buf_x) == 1 && modulo(y-buf_y) == 0) ||
        (modulo(x-buf_x) == 0 && modulo(y-buf_y) == 1)){
        // Trocar as jóias e desenhar a tabela nova
            swapJewel(buf_x, buf_y, x, y);
            drawTable();
        }
        // Apagar o buffer e a sinalização
        deSignal(buf_x,buf_y);
        buffer = null;
    };
};


// Função inicial
window.onload = startup
function startup() {

    createGameBox(BOARD_SIZE)

    // Encontrar o tamanho do tabuleiro
    blocks = document.getElementsByClassName("block");
    blocks_per_row = Math.sqrt(blocks.length)

    // Cria Array da Tabela
    createTable();

    // Randomiza as jóias e desenha a tabela
    baralhar();
    drawTable(true);
}
