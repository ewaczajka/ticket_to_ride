const player = document.querySelector('.player')
const playerBox = document.querySelector('.players')
const addPlayer = document.querySelector('.player__add')
const addPlayerBtn = addPlayer.querySelector('.player__add__btn')

const addNewPlayer = () => {
    const newPlayer = player.cloneNode(true)
    addPlayer.before(newPlayer)

    if (playerBox.childElementCount > 5) {
        addPlayer.classList.add('hide')
    }
}

addPlayerBtn.addEventListener('click', addNewPlayer)