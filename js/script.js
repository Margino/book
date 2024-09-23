// Referenes to DOM Elements
const book = document.querySelector('#book')
const main = document.querySelector('main')

const pages = document.querySelectorAll('.page')
const pagesCount = pages.length
const loader = document.querySelector('.loader')

const prevBtn = document.querySelector('#prev-btn')
const nextBtn = document.querySelector('#next-btn')


// Business Logic

// создаем индекс страниц
pages.forEach( (item, index) => item.setAttribute('data-page', index + 1))

// выставляем текущею страницу
pages[0].setAttribute('id', 'currentPage')

// лоадер

const toggleLoader = () => {
    loader.classList.add('active')
    prevBtn.disabled = true
    nextBtn.disabled = true

    setTimeout(()=> {
        loader.classList.remove('active')
    },2000)
}

const checkFirsLastPage = () => {
    // получаем текущую страницу
    let currentPageNum = document.querySelector('#currentPage').getAttribute('data-page')

    // проверяем, что не первая 
    if (currentPageNum <= 0) {
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

const getToPage = (index) => {

    // включаем лоадер
    toggleLoader()

    setTimeout (() => {
        // получаем текущую страницу
        let currentPage = document.querySelector('#currentPage')

        // получаем индекс текущей страницы
        let currentPageNum = currentPage.getAttribute('data-page')
        // console.log('currentPageNum: ', currentPageNum)

        // индекс новой текущей страницы
        let newCurrentPage = document.querySelector(`[data-page="${+currentPageNum + index}"]`)

        // меняем текущую страницу
        currentPage.removeAttribute('id')
        newCurrentPage.setAttribute('id', 'currentPage')

        // проверка на первую/последнюю страницу
        checkFirsLastPage()
    }, 1000)
}

const getToNextPage = () => {
    getToPage(1)
}

const getToPrevPage = () => {
    getToPage(-1)
}

// Event Listener
nextBtn.addEventListener('click', getToNextPage)
prevBtn.addEventListener('click', getToPrevPage)

// Запуск

// скрываем кнопку назад
checkFirsLastPage()