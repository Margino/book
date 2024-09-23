// Referenes to DOM Elements
const book = document.querySelector('#book')
const main = document.querySelector('main')

const pages = document.querySelectorAll('.page')
const pagesCount = pages.length
const loader = document.querySelector('.loader')

const prevBtn = document.querySelector('#prev-btn')
const nextBtn = document.querySelector('#next-btn')

const txtDown = document.querySelector('#txtDown')
const txtUp = document.querySelector('#txtUp')
const txtDefault = document.querySelector('#txtDefault')

const toPageBtn = document.querySelector('#toPageBtn')
const inputTxt = document.querySelector('#inputTxt')
const toPageInpt = document.querySelector('#toPageInpt')

const music = new Audio('./music/melody.mp3')
music.preload = "auto"

// Business Logic

// создаем индекс страниц
pages.forEach( (item, index) => item.setAttribute('data-page', index + 1))

// выставляем текущею страницу
pages[0].setAttribute('id', 'currentPage')
// выводим всего страниц
inputTxt.textContent = pagesCount

const toggleLoader = () => {
    // включаем музыку
    music.play()

    loader.classList.add('active')
    prevBtn.disabled = true
    nextBtn.disabled = true

    setTimeout(()=> {
        loader.classList.remove('active')
    }, 3000)
}

const checkFirsLastPage = () => {
    // получаем текущую страницу
    let currentPageNum = document.querySelector('#currentPage').getAttribute('data-page')
    

    // проверяем, что не первая 
    if (currentPageNum <= 1) {
        prevBtn.disabled = true
        nextBtn.disabled = false
        return
    }

    // проверяем, что не последняя 
    if (currentPageNum >= pagesCount) {
        nextBtn.disabled = true
        prevBtn.disabled = false
        return
    }

    // разблокируем кнопки навигации
    prevBtn.disabled = false
    nextBtn.disabled = false
}

// переход на страницу
const goToPage = (index) => {

    // включаем лоадер
    toggleLoader()

    setTimeout (() => {
        // получаем текущую страницу
        let currentPage = document.querySelector('#currentPage')

        // получаем индекс текущей страницы
        let currentPageNum = currentPage.getAttribute('data-page')

        // индекс новой текущей страницы
        let newCurrentPage = document.querySelector(`[data-page="${+currentPageNum + index}"]`)

        // меняем текущую страницу
        currentPage.removeAttribute('id')
        newCurrentPage.setAttribute('id', 'currentPage')

        // выводим номер текущей страницы
        toPageInpt.value = (+currentPageNum + index)

        // проверка на первую/последнюю страницу
        checkFirsLastPage()
         
    }, 2900)
}

const goToNextPage = () => {
    goToPage(1)
}

const goToPrevPage = () => {
    goToPage(-1)
}

const goToPageNum = () => {
    // проверяем, что введенное число входит в диапазон количества страниц
    if (toPageInpt.value < 1 ) {
        toPageInpt.value = document.querySelector('#currentPage').getAttribute('data-page')
        return
    }
    if (toPageInpt.value > pagesCount) {
        toPageInpt.value = document.querySelector('#currentPage').getAttribute('data-page')
        return
    }
    if (typeof +toPageInpt.value != 'number') {
        toPageInpt.value = document.querySelector('#currentPage').getAttribute('data-page')
        return
    }

    // текущая страница
    let currentPage = document.querySelector('#currentPage')
    currentPage.removeAttribute('id')

    // новая текущая страница
    let newCurrentPage = document.querySelector(`[data-page="${toPageInpt.value}"]`)
    newCurrentPage.setAttribute('id', 'currentPage')  

    // проверка на первую/последнюю страницу
    checkFirsLastPage()
}

// Увеличение / уменьшение размера шрифта

// размер шрифта по умолчанию 
const getFontSizeDefault = () => {
    let fontSizeDefault
    let el = document.body
    let style = window.getComputedStyle(el, null).getPropertyValue('font-size')
    return parseFloat(style)
}
// размер шрифта по умолчанию в глобальной переменной
const fontSizeDefault = getFontSizeDefault()

const changeText = (index) => {
    let fontSize = getFontSizeDefault()
    document.body.style.fontSize = (fontSize + index) + 'px'
}
const changeTxtDown = () => {
    changeText(-1)
}
const changeTxtUp = () => {
    changeText(1)
}
const changeTxtDefault = () => {
    document.querySelector('body').style.fontSize = fontSizeDefault + 'px'
}

// Event Listener
nextBtn.addEventListener('click', goToNextPage)
prevBtn.addEventListener('click', goToPrevPage)
toPageBtn.addEventListener('click', goToPageNum)
txtDown.addEventListener('click', changeTxtDown)
txtUp.addEventListener('click', changeTxtUp)
txtDefault.addEventListener('click', changeTxtDefault)



// Запуск

// скрываем кнопку назад
checkFirsLastPage()