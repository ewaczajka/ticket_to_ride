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

        this.initiateEvents()
        this.updateLogo()
    }

    buildTemplate() {
        if (players.length === 0) return playerTemplate
        let newPlayer = playerTemplate.cloneNode(true)
        newPlayer.querySelectorAll('form').forEach(el => el.reset())
        addPlayer.before(newPlayer)
        return newPlayer
    }

    initiateEvents() {
        let xxx = this 
        let name = this.html.querySelector('.player__profile__name')
        let logoLetter = this.html.querySelector('.player__profile__logo p')

        name.addEventListener('keyup', (event) => { 
            xxx.name = name.value
            logoLetter.textContent = `${xxx.name.charAt(0).toUpperCase()}`
        } )
    }

    updateLogo() {
        let xxx = this
        let logo = this.html.querySelector('.player__profile__logo')
        let tooltip = logo.querySelector('.tooltip')
        logo.addEventListener('click', (event) => { tooltip.classList.toggle('hide') } )
        const colors = tooltip.querySelectorAll('.tooltip__color')
        colors.forEach(color => color.addEventListener('click', (event) => { 
            xxx.color = color.dataset.color
            logo.classList.remove('blue', 'red', 'green', 'yellow', 'black')
            logo.classList.add(`${xxx.color}`)
        } ))
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
