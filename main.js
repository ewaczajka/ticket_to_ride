let player, playerBox, addPlayer, addPlayerBtn, players, playerLogo, playerName, tooltip

const main = () => {
    prepereDOMElements()
    prepereDOMEvents()
}

const prepereDOMElements = () => {
    player = document.querySelector('.player')
    playerBox = document.querySelector('.players')
    addPlayer = document.querySelector('.player__add')
    addPlayerBtn = document.querySelector('.player__add__btn')
    playerLogo = document.querySelector('.player__profile__logo')
    playerName = document.querySelector('.player__profile__name')
    tooltip = document.querySelector('.tooltip')
}

const prepereDOMEvents = () => {
    addPlayerBtn.addEventListener('click', addNewPlayer)
    playerBox.addEventListener('click', editPlayerLogo)
}

const addNewPlayer = () => {
    const newPlayer = player.cloneNode(true)
    addPlayer.before(newPlayer)

    if (playerBox.childElementCount > 5) {
        addPlayer.classList.add('hide')
    }
}

const editPlayerLogo = (e) => {
    if (e.target.matches('.player__profile__logo')) {
        tooltip = e.target.querySelector('.tooltip')
        tooltip.classList.toggle('hide')
        return
    }
    if (e.target.matches('.tooltip__color')) {
        changeColor(e)
    }
}

const changeColor = (e) => {
    const profileLogo = e.target.closest('.player__profile__logo')
    switch (true) {
        case e.target.classList.contains('blue'):
            profileLogo.classList.remove('blue', 'red', 'green', 'yellow', 'black')
            profileLogo.classList.add('blue')
            break
        case e.target.classList.contains('red'):
            profileLogo.classList.remove('blue', 'red', 'green', 'yellow', 'black')
            profileLogo.classList.add('red')
            break
        case e.target.classList.contains('green'):
            profileLogo.classList.remove('blue', 'red', 'green', 'yellow', 'black')
            profileLogo.classList.add('green')
            break
        case e.target.classList.contains('yellow'):
            profileLogo.classList.remove('blue', 'red', 'green', 'yellow', 'black')
            profileLogo.classList.add('yellow')
            break
        case e.target.classList.contains('black'):
            profileLogo.classList.remove('blue', 'red', 'green', 'yellow', 'black')
            profileLogo.classList.add('black')
            break
    }
    e.target.closest('.tooltip').classList.add('hide')
}

document.addEventListener('DOMContentLoaded', main)
