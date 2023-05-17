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
    }
}

const   PLAYERS_KEY   = "bejewel_players";
const   playerList    = JSON.parse(sessionStorage.getItem(PLAYERS_KEY)) || [];

function saveLogin()
{
    let user_name       = login_form.elements.nome.value;
    let user_gender     = login_form.elements.genero.value;
    let user_email      = login_form.elements.email.value;
    let user_password   = login_form.elements.senha.value;

    let player = new Player(user_name, user_gender, user_email, user_password)
    playerList.push(player)

    sessionStorage.setItem(PLAYERS_KEY, JSON.stringify(playerList));
};

function resetLogin() {
    login_form.reset();
}

function clearPlayers()
{
    playerList = []
    sessionStorage.setItem(PLAYERS_KEY, Players);
};
