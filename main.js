const player, playerBox, addPlayer, addPlayerBtn

const main = () => {
    prepereDOMElements()
    prepereDOMEvents()
}

const prepereDOMElements = () => {
    player = document.querySelector('.player')
    playerBox = document.querySelector('.players')
    addPlayer = document.querySelector('.player__add')
    addPlayerBtn = addPlayer.querySelector('.player__add__btn')
}

const prepereDOMEvenst = () => {
    addPlayerBtn.addEventListener('click', addNewPlayer)
}

const addNewPlayer = () => {
    const newPlayer = player.cloneNode(true)
    addPlayer.before(newPlayer)

    if (playerBox.childElementCount > 5) {
        addPlayer.classList.add('hide')
    }
}

document.addEventListener('DOMContentLoaded', main)