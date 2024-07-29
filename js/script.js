// Referenes to DOM Elements
const prevBtn = document.querySelector('#prev-btn')
const nextBtn = document.querySelector('#next-btn')
const book = document.querySelector('#book')
const main = document.querySelector('main')

const paper1 = document.querySelector('#p1')
const paper2 = document.querySelector('#p2')
const paper3 = document.querySelector('#p3')

// Business Logic
let currentLocation = 1
let numOfPage = 3
let maxLocation = numOfPage + 1
 
const goNextPage = () => {
    if (currentLocation >= maxLocation) return

    switch(currentLocation) {
        case 1:
            paper1.classList.add('flipped')
            setTimeout(() => {
                paper1.style.zIndex = 1
            }, 300);
            main.classList.remove('start')
            main.classList.add('active')
            break
        case 2:
            paper2.classList.add('flipped')
            paper2.style.zIndex = 2
            break
        case 3:
            paper3.classList.add('flipped')
            paper3.style.zIndex = 3
            main.classList.remove('active')
            main.classList.add('end')
            break
        default:
            throw new Error('unknown state')
    }
    currentLocation++
}

const goPrevPage = () => {
    if (currentLocation <= 1) return

    switch(currentLocation) {
        case 2:
            paper1.classList.remove('flipped')
            paper1.style.zIndex = 3
            main.classList.remove('active')
            main.classList.add('start')
            break
        case 3:
            paper2.classList.remove('flipped')
            paper2.style.zIndex = 2
            break
        case 4:
            paper3.classList.remove('flipped')
            setTimeout(()=> {
                paper3.style.zIndex = 1
            }, 300)
            main.classList.remove('end')
            main.classList.add('active')
            break
        default:
            throw new Error('unknown state')
    }
    currentLocation--
}

// Event Listener
nextBtn.addEventListener('click', goNextPage)
prevBtn.addEventListener('click', goPrevPage)

document.addEventListener('keydown', (e) => {
    const key = e.key
    switch (key) {
        case 'ArrowLeft':  
            goPrevPage()
            break
        case 'ArrowRight':
            goNextPage()
            break
    }
})