/*
Grupo: 39
PL: 21
60241 Dário Lopes Batista 
56791 Diogo Simas do Espírito Santo 
60237 Rafael Tomé
*/

// CONSTANTES

const COLORS = [
    "blue",
    "red",
    "yellow",
    "purple",
    "orange",
    "green",
    "white"
]

const NULL = "null_jewel"

let blocks
let blocks_per_row
let table = []

//CLASSES

class Jewel {
    constructor(color) {
        this.color = color 
        this.image = document.createElement("img");
        this.image.setAttribute("src", "imagens/joias/" + color + "-gem.webp");
        this.image.setAttribute("class", "jewel");
  }
}

// CRIAR TABELA DE ACORDO COM DIMENSÕES ATUAIS
function createTable() {
    /*
        *
        */
    for (let i = 0; i < blocks_per_row; i++) {
        const element = i;
        table.push([])
        for (let a = 0; a < blocks_per_row; a++) {
            table[element].push(null);
        }
    }
}

// NECESSÁRIO UMA VERSÃO DA FUNCAO QUE NÃO DEIXE 3 JÓIAS JUNTAS
function baralhar() {
    /*
        * Função de baralhar
        * Baralha as jóais no tabuleiro
        */
    for (let i = 0; i < blocks_per_row; i++) {
            const element = i;
        for (let a = 0; a < blocks_per_row; a++) {
            random_n = getRandomInt(COLORS.length)
            table[element][a] = new Jewel(COLORS[random_n])
        }
    }
}


function drawTable() {
    let n = 0
    for (let i = 0; i < table.length; i++) {
        const line = table[i];
        for (let a = 0; a < line.length; a++) {
            const block = line[a]
            if (block != null) {
                blocks[n].removeChild(blocks[n].firstChild)
            }
            blocks[n].appendChild(block.image)
            n += 1
        }
    }
}

function checkTable() {
    for (let i = 0; i < table.length; i++) {
        const element = array[i];
    }
}
function swapJewel(x, y, v, d) {
    if (!v) {
        sel_color = table[y][x].color
        rep_color = table[y][x+d].color
        table[y][x] = new Jewel(rep_color)
        table[y][x+d] = new Jewel(sel_color)
    } else {
        sel_color = table[y][x].color
        rep_color = table[y-d][x].color
        table[y][x] = new Jewel(rep_color)
        table[y-d][x] = new Jewel(sel_color)
    }
}

// STARTUP
window.onload = startup
function startup() {

    blocks = document.getElementsByClassName("block");
    blocks_per_row = Math.sqrt(blocks.length)

    createTable();

    baralhar();
    drawTable();
}

