let playerTemplate, addPlayerBtn, addPlayer, players = []

const trainPoints = {
    1: 1,
    2: 2,
    3: 4,
    4: 7,
    6: 15,
    8: 21,
}

class Player {
    constructor () {
        this.elms = {}
        this.name = ''
        this.color = ''
        this.scores = {
            trains: {},
            routes: {},
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
        this.elms['trains'] = newPlayer.querySelectorAll('[data-field-type="train"]')
        this.elms['trainsScore'] = newPlayer.querySelector('[data-score="train"]')
        this.elms['routes'] = newPlayer.querySelectorAll('[data-field-type="route"]')
        this.elms['routesScore'] = newPlayer.querySelector('[data-score="route"]')
        this.elms['html'] = newPlayer
        
    }

    initiateEvents() {
        this.elms.name.addEventListener('keyup', (e) => { this.updateName() })
        this.elms.logo.addEventListener('click', (e) => { this.elms.tooltip.classList.toggle('hide') })
        this.elms.colors.forEach(c => c.addEventListener('click', (e) => { this.updateColor(c.dataset.color) }) )
        this.elms.trains.forEach(t => t.addEventListener('keyup', (e) => { this.updateTrainsScore(t.dataset.trainLenght, t.value) }) )
        this.elms.routes.forEach(r => r.addEventListener('keyup', (e) => { this.updateRoutesScore(r.dataset.completed, r.value) }) )
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

    updateTrainsScore(lgth, num) {
        this.scores.trains[lgth] = num
        let sum = 0
        Object.keys(this.scores.trains).forEach(key => {
            sum += parseInt(this.scores.trains[key] | 0) * trainPoints[key]
        })
        this.elms.trainsScore.textContent = `${sum} points`
    }

    updateRoutesScore(cmpl, num) {
        this.scores.routes[cmpl] = addNum(num)
        let sum = ((this.scores.routes.completed) | 0) - ((this.scores.routes.uncompleted | 0))
        this.elms.routesScore.textContent = `${sum} points`
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

const addNum = (str) => {
    let sum = 0
    for (let i of str.split(/[, +;]/)) { sum += parseInt(i | 0)}
    return sum
}

document.addEventListener('DOMContentLoaded', main)
