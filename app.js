const timerDisplay = document.getElementById('timer')
const quoteDisplay = document.getElementById('quote-display')
const quoteInputElement = document.getElementById('quote-input')
const randomQuoteApiUrl = 'https://api.quotable.io/random'

let timerCount = 0
let timerInterval

function start() {
    quoteDisplay.textContent = ''
    quoteInputElement.value = ''
    clearInterval(timerInterval)
    timerCount = 0
    setTimer()
    setNextQuote()
}

function setTimer() {
    let startTime = new Date()
    timerInterval = setInterval(() => {
        timerDisplay.textContent = getTimerTime(startTime)
    }, 1000)
}

function getTimerTime(startTime) {
    return Math.floor((new Date() - startTime) / 1000)
}

function getRandomQuote() {
    return fetch(randomQuoteApiUrl)
        .then(response => response.json())
        .then(data => data.content)
}

async function setNextQuote() {
    const quote = await getRandomQuote()
    quote.split('').forEach(character => {
        const characterElement = document.createElement('span')
        characterElement.textContent = character
        quoteDisplay.append(characterElement)
    })
    quoteInputElement.textContent = ''
}

function checkForCorrect() {
    const quoteArray = quoteDisplay.querySelectorAll('span')
    const inputArray = quoteInputElement.value.split('')
    quoteArray.forEach((character, index) => {
        character.textContent === inputArray[index] ?
            character.classList.add('correct') :
            character.classList.add('incorrect')
        if (!inputArray[index]) {
            character.classList.remove('correct')
            character.classList.remove('incorrect')
        }

    })
    if (checkForPerfectInput(quoteArray)) {
        timerDisplay.textContent = '0'
        start()
    }
}

function checkForPerfectInput(quoteArray) {
    let correctInput = true
    quoteArray.forEach(character => {
        if (character.classList.contains('incorrect') || !character.classList.contains('correct')) {
            correctInput = false
        }
    })
    return correctInput
}

quoteInputElement.addEventListener('input', checkForCorrect)
start()