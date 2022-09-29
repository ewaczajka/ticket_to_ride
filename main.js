let playerTemplate, addPlayerBtn, addPlayer, players = []

class Player {
    constructor () {
        this.elms = {}
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

        this.buildTemplate()
        this.initiateEvents()
    }

    buildTemplate() {
        let newPlayer = playerTemplate.content.firstElementChild.cloneNode(true)
        addPlayer.before(newPlayer)

        this.elms['name'] = newPlayer.querySelector('.player__profile__name')
        this.elms['logoLetter'] = newPlayer.querySelector('.player__profile__logo p')
        this.elms['tooltip'] = newPlayer.querySelector('.tooltip')
        this.elms['logo'] = newPlayer.querySelector('.player__profile__logo')
        this.elms['colors'] = newPlayer.querySelectorAll('.tooltip__color')
        this.elms['tranis'] = newPlayer.querySelectorAll('[data-field-type="train"]')
        this.elms['html'] = newPlayer
        
    }

    initiateEvents() {
        this.elms.name.addEventListener('keyup', (e) => { this.updateName() })
        this.elms.logo.addEventListener('click', (e) => { this.elms.tooltip.classList.toggle('hide') })
        this.elms.colors.forEach(c => c.addEventListener('click', (e) => { this.updateColor(c.dataset.color) }) )
    }

    updateName() {
        this.name = this.elms.name.value
        this.elms.logoLetter.textContent = this.name.charAt(0).toUpperCase()
    }
    updateColor(color) {
        this.color = color
        this.elms.logo.classList.remove('blue', 'red', 'green', 'yellow', 'black')
        this.elms.logo.classList.add(color)
    }

}

const main = () => {
    prepereDOMElements()
    prepereDOMEvents()
}

const prepereDOMElements = () => {
    playerTemplate = document.querySelector('#player-template')
    addPlayer = document.querySelector('.player__add')
    addPlayerBtn = document.querySelector('.player__add__btn')
    players = [new Player, new Player]
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
