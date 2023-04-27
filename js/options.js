/*
Grupo: 39
PL: 21
60241 Dário Lopes Batista 
56791 Diogo Simas do Espírito Santo 
60237 Rafael Tomé
*/

// CONSTANTES

// Valores por omissão

const DEF_PLAYER_NUMBER = 2;
const DEF_MAX_POINTS    = 5;
const DEF_TIME_LIMT     = 5;
const DEF_BOARD_SIZE    = 8;

// Chaves para armazenamento no prowser
const PLAYER_NUMBER_KEY = "bejeweled_player_number";
const MAX_POINTS_KEY    = "bejeweled_max_points";
const TIME_LIMT_KEY     = "bejeweled_time_limit";
const BOARD_SIZE_KEY    = "bejeweled_board_size";

// Obter os dados da local storage
const PLAYER_NUMBER     = JSON.parse(sessionStorage.getItem(PLAYER_NUMBER_KEY)) ||
    DEF_PLAYER_NUMBER;
const MAX_POINTS        = JSON.parse(sessionStorage.getItem(MAX_POINTS_KEY))  ||
    DEF_MAX_POINTS;
const TIME_LIMT         = JSON.parse(sessionStorage.getItem(TIME_LIMT_KEY))  ||
    DEF_TIME_LIMT;
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
    sessionStorage.setItem(TIME_LIMT_KEY, time_limit);
    sessionStorage.setItem(BOARD_SIZE_KEY, board_size);
    sessionStorage.setItem(MAX_POINTS_KEY, max_points);
};

// Reseta as opções
function resetOptions() { options_form.reset(); };
