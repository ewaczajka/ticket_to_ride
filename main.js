let playerTemplate, addPlayerBtn, addPlayer, players = []

class Player {
    constructor () {
        this.html = this.buildTemplate()
        this.name = ''
        this.color = ''
        this.scores = {
            trains: {
                length1: 0,
                length2: 0,
                length3: 0,
                length4: 0,
                length6: 0,
                length8: 0,
            },
            routes: {
                completed: 0,
                uncompleted: 0,
            },
            longestRoute: false,
            stations: 0,
        }
    }

    buildTemplate() {
        if (players.length === 0) return playerTemplate
        let newPlayer = playerTemplate.cloneNode(true)
        newPlayer.querySelectorAll('form').forEach(el => el.reset())
        addPlayer.before(newPlayer)
        return newPlayer
    }
}

const main = () => {
    prepereDOMElements()
    prepereDOMEvents()
}

const prepereDOMElements = () => {
    playerTemplate = document.querySelector('.player')
    players = [new Player]
    addPlayer = document.querySelector('.player__add')
    addPlayerBtn = document.querySelector('.player__add__btn')
}

const prepereDOMEvents = () => {
    addPlayerBtn.addEventListener('click', addNewPlayer)

}

const addNewPlayer = () => {
    players.push(new Player())
    if (players.length === 5) {
        addPlayer.classList.add('hide')
    }
}

document.addEventListener('DOMContentLoaded', main)
