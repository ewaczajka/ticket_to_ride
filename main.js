let playerTemplate, addPlayerBtn, addPlayer, players = [], playersScores = []

const standingsIconArr = ['🥇','🥈','🥉','4️⃣','5️⃣']
const trainPoints = {1: 1, 2: 2, 3: 4, 4: 7, 6: 15, 8: 21}
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
        this.sumScores = [0,0,0,0] // [0] trains, [1] routes, [2] longestRoute, [3] stations

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
        this.elms.deleteBtn.addEventListener('click', (e) => { deletePlayer(this) })
    }

    updateName() {
        this.name = this.elms.name.value
        this.elms.logoLetter.textContent = this.name.charAt(0).toUpperCase()
        updatePlayersScores()
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
        this.sumScores[0] = sum
        updatePlayersScores()
    }

    updateRoutesScore(cmpl, num) {
        this.scores.routes[cmpl] = addNums(num)
        let sum = ((this.scores.routes.completed) | 0) - ((this.scores.routes.uncompleted | 0))
        this.elms.routesScore.textContent = `${sum} points`
        this.sumScores[1] = sum
        updatePlayersScores()
    }

    updateLongestRouteScore() {
        this.scores.longestRoute = this.elms.longestRoute.checked
        let sum = this.scores.longestRoute ? longestRoutePoints : 0
        this.elms.longestRouteScore.textContent = `${sum} points`
        this.sumScores[2] = sum 
        updatePlayersScores()
    }
    
    updateStationsScore() {
        this.scores.stations = this.elms.stations.value
        let sum = parseInt(this.scores.stations | 0) * stationPoints
        this.elms.stationsScore.textContent = `${sum} points`
        this.sumScores[3] = sum
        updatePlayersScores() 
    }
}

class PlayerScore {
    constructor (name, score) {
        this.name = name
        this.score = this.calculateScore(score)
    }

    calculateScore(s) {
        let sum = s.reduce((partialSum, a) => partialSum + a, 0)
        return sum
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
    standingsIcon = document.querySelectorAll('.standings__row__icon')
    standingsName = document.querySelectorAll('.standings__row__name')
    standingsScore = document.querySelectorAll('.standings__row__score')
}
const prepereDOMEvents = () => {
    addPlayerBtn.addEventListener('click', addNewPlayer)
}

const addNewPlayer = () => {
    players.push(new Player())
    if (players.length === 5) addPlayer.classList.add('hide')
}

const deletePlayer = (e) => {
    players[players.indexOf(e)].elms.html.remove()
    players.splice(players.indexOf(e), 1)
    if (players.length < 5) addPlayer.classList.remove('hide')
}

const addNums = (str) => {
    let sum = str.split(/[, +;]/).reduce((a, b) => a + parseInt(b | 0), 0)
    return sum
}

const updatePlayersScores = () => {
    playersScores = []
    players.forEach(p => {
        playersScores.push(new PlayerScore(p.name, p.sumScores))
    })   
    playersScores.sort((a, b) => b.score - a.score)
    standingsIcon.forEach(el => el.textContent = '')
    standingsName.forEach(el => el.textContent = '')
    standingsScore.forEach(el => el.textContent = '')
    for (i = 0; i < playersScores.length; i++) {
        standingsIcon[i].textContent = standingsIconArr[i]
        standingsName[i].textContent = playersScores[i].name
        standingsScore[i].textContent = `${playersScores[i].score} pts`
    }
}

document.addEventListener('DOMContentLoaded', main)
