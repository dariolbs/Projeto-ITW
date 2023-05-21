/*
Grupo: 39
PL: 21
60241 Dário Lopes Batista 
56791 Diogo Simas do Espírito Santo 
60237 Rafael Tomé
*/

// CONSTANTES

// Valores por omissão

const MAX_PLAYERS       = 4;
const DEF_PLAYER_NUMBER = 1;
const DEF_MAX_POINTS    = 5;
const DEF_TIME_LIMIT     = 5;
const DEF_BOARD_SIZE    = 8;

// Chaves para armazenamento no prowser
const PLAYER_NUMBER_KEY = "bejeweled_player_number";
const MAX_POINTS_KEY    = "bejeweled_max_points";
const TIME_LIMIT_KEY     = "bejeweled_time_limit";
const BOARD_SIZE_KEY    = "bejeweled_board_size";

// Obter os dados da local storage
const PLAYER_NUMBER     = JSON.parse(sessionStorage.getItem(PLAYER_NUMBER_KEY)) ||
    DEF_PLAYER_NUMBER;
const MAX_POINTS        = JSON.parse(sessionStorage.getItem(MAX_POINTS_KEY))  ||
    DEF_MAX_POINTS;
const TIME_LIMIT         = JSON.parse(sessionStorage.getItem(TIME_LIMIT_KEY))  ||
    DEF_TIME_LIMIT;
const BOARD_SIZE        = JSON.parse(sessionStorage.getItem(BOARD_SIZE_KEY)) ||
    DEF_BOARD_SIZE;

// Função que guarda os dados das opções na sessão do browser
function saveOptions()
{
    let player_number   = options_form.elements.player_number.value;
    let max_points      = options_form.elements.max_points.value;
    let time_limit      = options_form.elements.time_limit.value;
    let board_size      = options_form.elements.board_size.value;

    sessionStorage.setItem(PLAYER_NUMBER_KEY, player_number);
    sessionStorage.setItem(TIME_LIMIT_KEY, time_limit);
    sessionStorage.setItem(BOARD_SIZE_KEY, board_size);
    sessionStorage.setItem(MAX_POINTS_KEY, max_points);
    
    let path = window.location.pathname;
    let directoryPath = path.substring(0, path.lastIndexOf("/"));
    let newPath = directoryPath + "/index.html";
    window.location.href = newPath;
};

// Reseta as opções
function resetOptions() { options_form.reset(); };
