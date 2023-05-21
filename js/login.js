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
        this.time_left = 0;
    }
}

const   PLAYERS_KEY   = "bejewel_players";
let   playerList    = JSON.parse(localStorage.getItem(PLAYERS_KEY)) || [];

function resetPlayers() {
    // Limpar a local storage
    localStorage.clear()
}
function saveLogin()
{
    if (playerList.length === 4) {
        document.getElementById("message").textContent = "ERRO: número máximo (4) de jogadores alcançado."
        return false
    }

    let user_name       = login_form.elements.nome.value;
    let user_gender     = login_form.elements.genero.value;
    let user_email      = login_form.elements.email.value;
    let user_password   = login_form.elements.senha.value;

    // verifica se o nome ou email estão preenchidos
    if (user_name === "") {
        document.getElementById("message").textContent = "ERRO: insira um nome de utilizador"
    }
    else {
        let player = new Player(user_name, user_gender, user_email, user_password)
        playerList.push(player)

        localStorage.setItem(PLAYERS_KEY, JSON.stringify(playerList));


        login_form.elements.nome.value = ""
        login_form.elements.genero.value = ""
        login_form.elements.email.value = ""
        login_form.elements.senha.value = ""
        document.getElementById("message").textContent = "Player número \"" + playerList.length + "\" adicionado"
    }
};

function resetLogin() {
    login_form.reset();
}

function clearPlayers()
{
    playerList = []
    document.getElementById("message").textContent = "INFO: Quantidade de jogadores recomeçada."
    localStorage.clear()
};
