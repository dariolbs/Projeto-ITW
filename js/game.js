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

// Criar tabela de acordo com dimensões atuais
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

function moveJewel(x, y, horizontal, distance) {
    /*
        * Se "horizontal" for falso, a joia irá se mover x distance na vertical
        */
        const buffer = table
        if (!horizontal) {
            const newx = x + distance;
            table[y][newx] = new Jewel(buffer[y][x].color);
            if (newx < x) {
                for (let i = 0; i < (x-newx); i++) {
                    table[y][x-i] = new Jewel(buffer[y][x-i-1].color);
                } 
            }
            if (newx > x) {
                for (let i = 0; i < (newx-x); i++) {
                    table[y+i][x] = new Jewel(buffer[y+i+1][x].color);
                }
            }
        } else {
            const newy = y + distance;
            table[newy][x] = new Jewel(buffer[y][x].color);
            if (newy < y) {
                for (let i = 0; i < (y-newy); i++) {
                    table[y-i][x] = new Jewel(buffer[y-i-1][x].color);
                } 
            }
            if (newy > y) {
                for (let i = 0; i < (newy-y); i++) {
                    table[y+i][x] = new Jewel(buffer[y+i+1][x].color);
                }
            }
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

