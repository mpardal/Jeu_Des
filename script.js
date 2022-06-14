

/**
 * @typedef {{round: number, name: string, global: number}} Player
 */

/** @type {Player} */
const player1 = {
    name: 'Player1',
    global: 0,
    round: 0,
    get total() {
        return this.global + this.round
    }
}

/** @type {Player} */
const player2 = {
    name: '',
    global: 0,
    round: 0,
    get total() {
        return this.global + this.round
    }
}

player1.name = prompt('Quel est le nom du joueur 1 ?')
player2.name = prompt('Quel est le nom du joueur 2 ?')

let currentPlayer = player1

const reset = document.querySelector("#reset")
const replay = document.querySelector("#replay")
const hold = document.querySelector("#hold")

const labelReplayP1 = document.querySelector('#labelReplayP1')
const labelTourP1 = document.querySelector('#labelTourP1')
const labelGlobalP1 = document.querySelector('#labelGlobalP1')
const labelReplayP2 = document.querySelector('#labelReplayP2')
const labelTourP2 = document.querySelector('#labelTourP2')
const labelGlobalP2 = document.querySelector('#labelGlobalP2')

const playerTurn = document.querySelector('#playerTurn')

const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

const totalToWin = 100

playerTurn.innerHTML = currentPlayer.name

p1.innerHTML = player1.name
p2.innerHTML = player2.name

reset.addEventListener('click', () => {
    player1.global = 0
    player1.round = 0
    player2.global = 0
    player2.round = 0
    labelReplayP1.innerHTML = '0'
    labelReplayP2.innerHTML = '0'
    updateHtml(player1)
    changePlayer(player1)
    updateHtml(player2)
})

// delete event précédent mais garder en memoire le score à additionner (à trouver)
replay.addEventListener('click', () => {
    let number = generateNumber()

    if (currentPlayer === player1){
        labelReplayP1.innerHTML = number.toString()
        if (number !== 1) {
            currentPlayer.round = currentPlayer.round + number

            if (isWin()) {
                endGame()
            }
        } else {
            currentPlayer.round = 0
            togglePlayer()
        }
        updateHtml(player1)
    }else {
        labelReplayP2.innerHTML = number.toString()
        if (number !== 1) {
            currentPlayer.round = currentPlayer.round + number

            if (isWin()) {
                endGame()
            }
        } else {
            currentPlayer.round = 0
            togglePlayer()
        }
        updateHtml(player2)
    }




})

hold.addEventListener('click', () => {
    currentPlayer.global = currentPlayer.global + currentPlayer.round
    currentPlayer.round = 0

    global()

    if (isWin()) {
        endGame()
    } else {
        togglePlayer()
    }
})

function global (){
    if (currentPlayer === player1){
        labelGlobalP1.innerHTML = currentPlayer.global
    }else {
        labelGlobalP2.innerHTML = currentPlayer.global
    }
}


/**
 * @return {number}
 */
function generateNumber() {
    return Math.floor(Math.random() * (7 - 1)) + 1;
}

/**
 * Permet de mettre à jour le html avec les scores en paramètres
 *
 * @param {Player} p
 */
function updateHtml(p) {
    if (p === player1){
        labelTourP1.innerHTML = p.round.toString()
        labelGlobalP1.innerHTML = p.global.toString()
    }else {
        labelTourP2.innerHTML = p.round.toString()
        labelGlobalP2.innerHTML = p.global.toString()
    }
}

/**
 * Change le joueur en cours et met à jour le html
 * avec le nouveau joueur (le html qui montre le joueur qui joue)
 *
 * @param {Player} newPlayer
 */
function changePlayer(newPlayer) {
    currentPlayer = newPlayer
    playerTurn.innerHTML = currentPlayer.name
}

function togglePlayer() {
    if (currentPlayer === player1) {
        player1.round = 0
        changePlayer(player2)
    } else {
        player2.round = 0
        changePlayer(player1)
    }
}

function endGame() {
    alert(currentPlayer.name + ' a gagné avec ' + currentPlayer.total)

    player1.global = 0
    player1.round = 0
    player2.global = 0
    player2.round = 0
    labelReplayP1.innerHTML = '0'
    labelReplayP2.innerHTML = '0'
    changePlayer(player1)
    updateHtml(player1)
}

function isWin() {
    return currentPlayer.total >= totalToWin
}
