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

//Classes
/* Classe de uma jóia. Apenas é necessária uma cor */
class Jewel {
    constructor(color)
    {
        this.color = color 
        this.image = document.createElement("img");
        this.image.setAttribute("src", "imagens/joias/" + color + "-gem.webp");
        this.image.setAttribute("class", "jewel");
    }
}

// Criar tabela de acordo com dimensões atuais da caixa do jogo
function createTable() {
    // Cria a tabela de acordo com o número de divisões em "#gamebox"
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
function drawTable()
{
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

/** POR FAZER
Função que verifica e remove jóias que estão alinhadas
vericalmente ou horizontalmente com outras 3 ou mais */
function checkTable() {

    let horizlines = table

    // Criar um array de todas as linhas vericais

    let vertlines = []
    for (let i = 0; i < table.length; i++) {
        vertlines.push([])
        for (let a = 0; a < table.length; a++) {
            vertlines[i].push(table[a][i])
        }
    }
}

/** Função swapJewel
    Troca a jóia em posição x,y pela jóia em posição nx,ny */
function swapJewel(x, y, nx, ny)
{
    sel_color = table[y][x].color
    rep_color = table[ny][nx].color
    table[y][x] = new Jewel(rep_color)
    table[ny][nx] = new Jewel(sel_color)
}

// Função inicial
window.onload = startup
function startup() {

    // Encontrar o tamanho do tabuleiro
    blocks = document.getElementsByClassName("block");
    blocks_per_row = Math.sqrt(blocks.length)

    // Cria Array da Tabela
    createTable();

    // Randomiza as jóias e desenha a tabela
    baralhar();
    drawTable();
}
