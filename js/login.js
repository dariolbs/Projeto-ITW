// Variaveis

"use strict"

class Player {
    // Classe de um jogador. Requer nome
    constructor(name, gender, email, password)
    {
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.points = 0;
        this.isPlaying = false;
        this.scores = [];
        this.time_left = TIME_LIMIT * 60 * 1000;
    }
}

const   PLAYERS_KEY   = "bejewel_players";
const   playerList    = JSON.parse(localStorage.getItem(PLAYERS_KEY)) || [];

function resetPlayers() {
    // Limpar a local storage
    localStorage.clear()
}
function saveLogin()
{
    // Salvar o login
    let user_name       = login_form.elements.nome.value;
    let user_gender     = login_form.elements.genero.value;
    let user_email      = login_form.elements.email.value;
    let user_password   = login_form.elements.senha.value;

    let player = new Player(user_name, user_gender, user_email, user_password)
    playerList.push(player)

    localStorage.setItem(PLAYERS_KEY, JSON.stringify(playerList));
};

function resetLogin() {
    login_form.reset();
}

function clearPlayers()
{
    playerList = []
    localStorage.setItem(PLAYERS_KEY, Players);
};
