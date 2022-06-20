/**
 * @typedef {{round: number, name: string, global: number}} Player
 */

/** @type {Player} */
const player1 = {
    name: '',
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

//Déclaration des boutons
const reset = document.querySelector("#reset")
const replay = document.querySelector("#replay")
const hold = document.querySelector("#hold")

//Déclaration des écritures
const labelTourP1 = document.querySelector('#labelTourP1')
const labelGlobalP1 = document.querySelector('#labelGlobalP1')
const labelTourP2 = document.querySelector('#labelTourP2')
const labelGlobalP2 = document.querySelector('#labelGlobalP2')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const pt1 = document.querySelector('#pt1')
const pt2 = document.querySelector('#pt2')

//Déclaration des dés
const des1 = document.getElementById('des1')
const des2 = document.getElementById('des2')
const des3 = document.getElementById('des3')
const des4 = document.getElementById('des4')
const des5 = document.getElementById('des5')
const des6 = document.getElementById('des6')

const totalToWin = 100

let currentPlayer = player1
pt1.innerText = pt1.style.display = 'inline'
p1.style.fontWeight = "400"

//Demande du nom des joueurs
name()


// Consigne
consigne()


//Bouton de remise à zéro
reset.addEventListener('click', () => {
    player1.global = 0
    player1.round = 0
    player2.global = 0
    player2.round = 0
    styleP1()
    name()
    consigne()
    updateHtml(player1)
    changePlayer(player1)
    updateHtml(player2)

})

// Gestion du bouton pour jouer
replay.addEventListener('click', () => {
    let number = generateNumber()

    if (currentPlayer === player1){
        styleP1()
        dice(number)
        tirage(number)
        updateHtml(player1)
    }else {
        styleP2()
        dice(number)
        tirage(number)
        updateHtml(player2)
    }

})


//Fin du tour et stockage
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

function name() {
    player1.name = prompt('Quel est le nom du joueur 1 ?')
    player2.name = prompt('Quel est le nom du joueur 2 ?')
    if (player1.name === ''){
        player1.name = 'PLAYER 1'
        p1.innerHTML = player1.name
    }else {
        p1.innerHTML = player1.name
    }
    if (player2.name === ''){
        player2.name = 'PLAYER 2'
        p2.innerHTML = player2.name
    }else {
        p2.innerHTML = player2.name
    }
}

function consigne(){
    alert("Pour jouer, il faut appuyer sur ROLL DICE, si vous faites 1, votre tour s'arrête et votre score du tour (CURRENT), " +
        "vous cumulez des points en faisant des chiffres de 2 à 6. Lorsque vous décidez de finir votre tour, appuyer sur HOLD." +
        "Le premier à 100 gagne.")
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
}

function togglePlayer() {
    if (currentPlayer === player1) {
        player1.round = 0
        changePlayer(player2)
        styleP2()
    } else {
        player2.round = 0
        changePlayer(player1)
        styleP1()
    }
}

function tirage(number){
    if (number !== 1) {
        currentPlayer.round = currentPlayer.round + number

        if (isWin()) {
            endGame()
        }
    } else {
        currentPlayer.round = 0
        togglePlayer()
    }
}

function styleP1 (){
    pt1.innerText = pt1.style.display = 'inline'
    pt2.innerText = pt2.style.display = 'none'
    p2.style.fontWeight = "100"
    p1.style.fontWeight = "400"
}

function styleP2 (){
    pt2.innerText = pt2.style.display = 'inline'
    pt1.innerText = pt1.style.display = 'none'
    p2.style.fontWeight = "400"
    p1.style.fontWeight = "100"
}

function dice(number){
   switch (number){
        case 1 :
            des1.innerText = des1.style.display = 'block'
            des2.innerText = des2.style.display = 'none'
            des3.innerText = des3.style.display = 'none'
            des4.innerText = des4.style.display = 'none'
            des5.innerText = des5.style.display = 'none'
            des6.innerText = des6.style.display = 'none'
            break
        case 2 :
            des1.innerText = des1.style.display = 'none'
            des2.innerText = des2.style.display = 'block'
            des3.innerText = des3.style.display = 'none'
            des4.innerText = des4.style.display = 'none'
            des5.innerText = des5.style.display = 'none'
            des6.innerText = des6.style.display = 'none'
            break
        case 3 :
            des1.innerText = des1.style.display = 'none'
            des2.innerText = des2.style.display = 'none'
            des3.innerText = des3.style.display = 'block'
            des4.innerText = des4.style.display = 'none'
            des5.innerText = des5.style.display = 'none'
            des6.innerText = des6.style.display = 'none'
            break
        case 4 :
            des1.innerText = des1.style.display = 'none'
            des2.innerText = des2.style.display = 'none'
            des3.innerText = des3.style.display = 'none'
            des4.innerText = des4.style.display = 'block'
            des5.innerText = des5.style.display = 'none'
            des6.innerText = des6.style.display = 'none'
            break
        case 5 :
            des1.innerText = des1.style.display = 'none'
            des2.innerText = des2.style.display = 'none'
            des3.innerText = des3.style.display = 'none'
            des4.innerText = des4.style.display = 'none'
            des5.innerText = des5.style.display = 'block'
            des6.innerText = des6.style.display = 'none'
            break
        default :
            des1.innerText = des1.style.display = 'none'
            des2.innerText = des2.style.display = 'none'
            des3.innerText = des3.style.display = 'none'
            des4.innerText = des4.style.display = 'none'
            des5.innerText = des5.style.display = 'none'
            des6.innerText = des6.style.display = 'block'
    }
}

function endGame() {
    alert(currentPlayer.name + ' a gagné avec ' + currentPlayer.total)

    player1.global = 0
    player1.round = 0
    player2.global = 0
    player2.round = 0
    changePlayer(player1)
    updateHtml(player1)
}

function isWin() {
    return currentPlayer.total >= totalToWin
}
