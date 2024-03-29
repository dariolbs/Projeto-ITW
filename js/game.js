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

const FLASH_N_FEZES = 3

const SPAN_PONTOS = "spanPontos"

// Declarar variáveis que serão usadas na função inicial

let buffer = null

//Classes

class Game {

    constructor(nPlayers) {

        this.boxes = [];

        this.players = [null, null, null, null];

        for (let i = 0; i < playerList.length; i++) {
            this.players[i] = playerList[i]
        }

        this.tables = [];

        for (let i = 0; i < nPlayers; i++) {
            this.boxes.push([])
            this.tables.push([])
        }
    }
}

let game = new Game(PLAYER_NUMBER)

/* Classe de uma jóia. Apenas é necessária uma cor */

class DivBlock {
    // Classe de um bloco na caixa do jogo
    // type -> valor booleano (true ou false) (branco ou sem cor)
    // rownumber -> número de rows da caixa do jogo
    // x -> posição x do bloco
    // y -> posição y do bloco
    constructor(type, rownumber, table, box, player, x, y) {
        this.type = type;
        this.size = 100 / rownumber + "%"
        this.div = document.createElement("div");
        this.div.setAttribute("onclick", "moveJewel(" + x + "," + y + ","
            + table + "," + box + "," + player + ")");
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
    constructor(color) {
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

function paddingZero(num) {
    return (num < 10) ? `0${num}` : num;
}

async function timer (player) {
    let countDownTime = TIME_LIMT * 60 * 1000
    var timer = setInterval(() => {
        countDownTime = countDownTime - 1000
        if (countDownTime === 0 || countDownTime < 0) {
            clearInterval(timer);
            document.getElementById("spanTempo").innerText = "TEMPO ACABOU!";
            end_game("time", player);
        }
        else {
            let horas = Math.floor(countDownTime / 1000 / 60 / 60);
            let minutos = Math.floor((countDownTime / 1000 / 60) % 60);
            let segundos = Math.floor((countDownTime / 1000) % 60);
            let time = `${paddingZero(horas)}:${paddingZero(minutos)}:${paddingZero(segundos)}`;
            document.getElementById("spanTempo").innerText = time;
        }
    }, 1000);
}

function addPoints(add, player) {
    player.points += add
    document.getElementById(SPAN_PONTOS).innerHTML = player.points
}

function updatePoints() {
    let spans = document.getElementsByClassName(SPAN_PONTOS)
    for (let i = 0; i < spans.length; i++) {
        spans[0].innerHTML = game.players[0].points
    }
}

function isPair(number) {
    // Retorna um valor booleano que representa se o número é ou não par
    if (number % 2) { return true }
    else { return false }
}

function createGameBoxes() {

    // Obter as caixas em jogo
    let gameboxes = document.getElementsByClassName("gamebox")
    for (let b = 0; b < gameboxes.length; b++) {
        const box = gameboxes[b];
        let block_table = []
        for (let i = 0; i < BOARD_SIZE; i++) {
            // criar uma tabela de blocos
            block_table.push([])
            for (let a = 0 + i; a < BOARD_SIZE + i; a++) {
                const new_block = new DivBlock(isPair(a), BOARD_SIZE
                    , "game.tables[" + b + "]", "game.boxes[" + b + "]",
                    "game.players[" + b + "]", a - i, i);
                box.appendChild(new_block.div);
                block_table[i].push(new_block.div);
            }
        }
        game.boxes[b] = block_table
    }
    return gameboxes.length
}

function createTable() {
    // Cria a tabela de acordo com o número de divisões em "#gamebox"
    let table = []
    for (let i = 0; i < BOARD_SIZE; i++) {
        const element = i;
        table.push([])
        for (let a = 0; a < BOARD_SIZE; a++) {
            table[element].push(null);
        }
    }
    return table
}

function baralhar(table) {
    /* Função de baralhar
    * Baralha as jóais no tabuleiro */
    let random_n = 0
    for (let i = 0; i < BOARD_SIZE; i++) {
        const element = i;
        for (let a = 0; a < BOARD_SIZE; a++) {
            random_n = getRandomInt(COLORS.length)
            table[element][a] = new Jewel(COLORS[random_n])
        }
    }
}

// Função que desenha a tabela no website
function drawTable(table, block_table, first = false) {
    //let n = 0
    for (let i = 0; i < table.length; i++) {
        for (let a = 0; a < table.length; a++) {
            if (!first) {
                //blocks[n].removeChild(blocks[n].firstChild)
                block_table[i][a].removeChild(block_table[i][a].firstChild)
            }
            //blocks[n].appendChild(block.image)
            block_table[i][a].appendChild(table[i][a].image)
        }
    }
}

async function flash(x, y, table, block_table) {
    // Dá flash nos blocos a volta de (x, y)
    // O número de vezes que dá flash está na variável
    // FLASH_N_FEZES
    for (let n = 0; n < FLASH_N_FEZES; n++) {
        highlight(x, y, table, block_table);
        await sleep(80);
        deHighlight(x, y, block_table);
        await sleep(80);
    }
}

function highlight(x, y, table, block_table) {
    // Sinaliza todos os blocos que a jóia em posição x,y pode se mover
    if (checkExistance(table, x + 1, y)) { block_table[y][x + 1].setAttribute("class", "highlighted_block block"); }
    if (checkExistance(table, x - 1, y)) { block_table[y][x - 1].setAttribute("class", "highlighted_block block"); }
    if (checkExistance(table, x, y - 1)) { block_table[y - 1][x].setAttribute("class", "highlighted_block block"); }
    if (checkExistance(table, x, y + 1)) { block_table[y + 1][x].setAttribute("class", "highlighted_block block"); }
}

function deHighlight(x, y, block_table) {
    // Remove a sinalização nas jóias por volta de x,y
    if (typeof block_table[y][x + 1] != "undefined") {
        if (isPair(y + x)) {
            block_table[y][x + 1].setAttribute("class", "transparent_block block");
        } else {
            block_table[y][x + 1].setAttribute("class", "white_block block");
        }
    }
    if (typeof block_table[y][x - 1] != "undefined") {
        if (isPair(y + x)) {
            block_table[y][x - 1].setAttribute("class", "transparent_block block");
        } else {
            block_table[y][x - 1].setAttribute("class", "white_block block");
        }
    }
    if (typeof block_table[y - 1] != "undefined") {
        if (isPair(y + x)) {
            block_table[y - 1][x].setAttribute("class", "transparent_block block");
        } else {
            block_table[y - 1][x].setAttribute("class", "white_block block");
        }
    }
    if (typeof block_table[y + 1] != "undefined") {
        if (isPair(y + x)) {
            block_table[y + 1][x].setAttribute("class", "transparent_block block");
        } else {
            block_table[y + 1][x].setAttribute("class", "white_block block");
        }
    }
}

function checkExistance(table, x, y) {
    // Retorna um valor booleano representando se a peça
    // em posição x,y existe ou não
    if (typeof table[y] == "undefined") { return false }
    else if (typeof table[y][x] == "undefined") { return false }
    else { return true }
}

function checkVertical(vertlines, table, remove = true, player = null) {
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
                    if (remove) { removeJewel(table, x, y); }
                    if (player) { addPoints(POINTS_PER_JEWEL, player) }
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
                    if (remove) { removeJewel(table, x, y); }
                    if (player) { addPoints(POINTS_PER_JEWEL, player) }
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

function checkHorizontal(horizlines, table, remove = true, player = null) {
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
                    if (remove) { removeJewel(table, x, y); }
                    if (player) { addPoints(POINTS_PER_JEWEL, player) }
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
                    if (remove) { removeJewel(table, x, y); }
                    if (player) { addPoints(POINTS_PER_JEWEL, player) }
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
    // Repõe os espaços vazios no jogo com jóias aleatórias
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

function slideJewel(table)
// Desliza as jóias para baixo caso haja espaços vazios
{
    for (let i = 0; i < table.length; i++) {
        const row = table[i]
        for (let a = 0; a < row.length; a++) {
            const element = row[a]
            if (element.color === null) {
                for (let b = i; b >= 1; b--) {
                    swapJewel(table, a, b, a, b - 1)
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
    changed = checkVertical(vertlines, table, remove, player) ||
        checkHorizontal(horizlines, table, remove, player)

    // Retorna um valor booleano a undicar se a tabela mudou ou não
    return changed
}

/** Função swapJewel
    Troca a jóia em posição x,y pela jóia em posição nx,ny */

function swapJewel(table, x, y, nx, ny) {
    // Troca a jóia em posição x,y pela nx, ny
    let sel_color = table[y][x].color
    let rep_color = table[ny][nx].color
    table[y][x] = new Jewel(rep_color)
    table[ny][nx] = new Jewel(sel_color)
};

function removeJewel(table, x, y) {
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


function modulo(x) {
    // Função módulo, retorna o módulo do número "x"
    if (x < 0) { return - x }
    else { return x }
};

function checkPlacement(table, x, y, nx, ny) {
    // Verificar se a jóia está perto da outra
    let isclose = ((modulo(nx - x) == 1) && (modulo(ny - y) == 0) ||
        (modulo(nx - x) == 0) && (modulo(ny - y) == 1))
    // Verificar se são alinhadas 3 ou mais jóias durante a jogada
    swapJewel(table, x, y, nx, ny)
    let changes = checkTable(table, false)
    swapJewel(table, nx, ny, x, y)
    return isclose && changes
}

async function transition(table, block_table) {
    // Fazer uma transição sempre que algo acontecer no jogo
    drawTable(table, block_table);
    await sleep(110)
}

async function moveJewel(x, y, table, block_table, player = null) {
    if (player === null) {
        var path = window.location.pathname;
        var directoryPath = path.substring(0, path.lastIndexOf("/"));
        var newPath = directoryPath + "/login.html";
        window.location.href = newPath;
    }
    if (!buffer) {
        // Criar um buffer para ser usado no próximo clique
        buffer = [x, y];
        highlight(x, y, table, block_table);
    }
    else {
        let game_over = false
        // Obter cordenadas da jóia antiga
        let buf_x = buffer[0];
        let buf_y = buffer[1];
        deHighlight(buf_x, buf_y, block_table);
        // Verificar se a jóia pode ser movida para a posição nova
        if (checkPlacement(table, buf_x, buf_y, x, y)) {
            // Trocar as jóias e desenhar a tabela nova     
            swapJewel(table, buf_x, buf_y, x, y);
            await transition(table, block_table)
            // Eliminar jóias em conjunto
            while (checkTable(table, true, player) != false) {
                // Verifica que não existem 3 ou mais jóias em conjunto
                await transition(table, block_table)
                slideJewel(table);
                await transition(table, block_table)
                refill(table);
            }
            drawTable(table, block_table);
            // Dar update às pontuações
            updatePoints()
            // Verificar se o jogo acabou
            game_over = (!checkPossible(table))
        } else { flash(buf_x, buf_y, table, block_table) }
        // Apagar o buffer e a sinalização
        buffer = null;
    };
};

// Impedir movimentos
const lock_table = () => {
    null
}

// Função final
var end_game = (typeOfEndgame, player=null) => {
    lock_table() // TODO
    if (typeOfEndgame === "time") {
        document.getElementById("endgame_title").innerText = "O TEMPO ACABOU"
    }
    else if (typeOfEndgame === "points") {
        document.getElementById("endgame_title").innerText = "MÁXIMO DE PONTOS ATINGIDO"
    }    
    document.getElementById("endgame_points").innerText = player.points
    document.getElementById("endgame_name").innerText = player.user_name
}

// Função inicial
const start = () => {
    createGame();   // TODO: fazer com que não seja possível carregar outra vez antes do jogo terminar
}

function createGame() {

    // Criar as caixas dos jogos e obter o número de jogos
    let nGames = createGameBoxes();

    // Baralhar os todos os tabuleiros
    for (let n = 0; n < nGames; n++) {
        game.tables[n] = createTable();
        let table = game.tables[n]
        let blocks = game.boxes[n]
        baralhar(table);
        // Verifica que não existem 3 ou mais jóias em conjunto
        while (checkTable(table) != false) {
            slideJewel(table);
            refill(table);
        }
        // Desenhar as tabelas
        drawTable(table, blocks, true);
        timer()
    }

}
