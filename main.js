let playerTemplate, addPlayerBtn, addPlayer, players = []

const trainPoints = {
    1: 1,
    2: 2,
    3: 4,
    4: 7,
    6: 15,
    8: 21,
}
const longestRoutePoints = 10
const stationPoints = 4

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
        this.elms['longestRoute'] = newPlayer.querySelector('[data-field-type="longestRoute"]')
        this.elms['longestRouteScore'] = newPlayer.querySelector('[data-score="longestRoute"]')
        this.elms['stations'] = newPlayer.querySelector('[data-field-type="stations"]')
        this.elms['stationsScore'] = newPlayer.querySelector('[data-score="stations"]')
        this.elms['deleteBtn'] = newPlayer.querySelector('.player__delete')
        this.elms['html'] = newPlayer
        
    }

    initiateEvents() {
        this.elms.name.addEventListener('keyup', (e) => { this.updateName() })
        this.elms.logo.addEventListener('click', (e) => { this.elms.tooltip.classList.toggle('hide') })
        this.elms.colors.forEach(c => c.addEventListener('click', (e) => { this.updateColor(c.dataset.color) }) )
        this.elms.trains.forEach(t => t.addEventListener('keyup', (e) => { this.updateTrainsScore(t.dataset.trainLenght, t.value) }) )
        this.elms.routes.forEach(r => r.addEventListener('keyup', (e) => { this.updateRoutesScore(r.dataset.completed, r.value) }) )
        this.elms.longestRoute.addEventListener('click', (e) => { this.updateLongestRouteScore() })
        this.elms.stations.addEventListener('keyup', (e) => { this.updateStationsScore() })
        document.addEventListener('click', (e) => { this.toggleDeleteBtn(e) })
        this.elms.deleteBtn.addEventListener('click', (e) => { this.deletePlayer() })
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
        this.scores.routes[cmpl] = addNums(num)
        let sum = ((this.scores.routes.completed) | 0) - ((this.scores.routes.uncompleted | 0))
        this.elms.routesScore.textContent = `${sum} points`
    }

    updateLongestRouteScore() {
        this.scores.longestRoute = this.elms.longestRoute.checked
        if (this.scores.longestRoute) 
            this.elms.longestRouteScore.textContent = `${longestRoutePoints} points` 
        else this.elms.longestRouteScore.textContent = `0 points` 
    }
    
    updateStationsScore() {
        this.scores.stations = this.elms.stations.value
        let sum = parseInt(this.scores.stations | 0) * stationPoints
        this.elms.stationsScore.textContent = `${sum} points` 
    }

    toggleDeleteBtn(el) {
        if (this.elms.html.contains(el.target))  
        this.elms.deleteBtn.classList.remove('hide')
        else this.elms.deleteBtn.classList.add('hide')
    }

    deletePlayer() {
       // debugger
        console.log(players.indexOf(this))
        players.splice(players.indexOf(this), 1)
        debugger
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

const addNums = (str) => {
    let sum = 0
    for (let i of str.split(/[, +;]/)) { sum += parseInt(i | 0)}
    return sum
}

document.addEventListener('DOMContentLoaded', main)
