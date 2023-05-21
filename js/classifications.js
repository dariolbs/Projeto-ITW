const PROFILE = "statisticsItem"

function setScores() {
    const players = JSON.parse(localStorage.getItem(PLAYERS_KEY))

    let scores = []
    let names = []

    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        for (let a = 0; a < player.scores.length; a++) {
            const score = player.scores[a]
            scores.push(score)
            names.push(player.name)
        }
    }

    let items = document.getElementsByClassName(PROFILE)

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let max = scores[0]
        let maxidx = 0
        for (let a = 0; a < scores.length; a++) {
            const score = scores[a];
            if (score > max) { max = score; maxidx = a }
        }
        if (names[maxidx] != undefined && scores[maxidx] != undefined ){
            item.innerHTML = `${names[maxidx]} - ${max}`
        }
        scores.pop(scores[maxidx])
        names.pop(names[maxidx])
    }
}

window.onload = setScores
