const postsContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
let page = 1

const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
    return response.json()
}

const addPostInToDOM = async () => {
    const posts = await getPosts()
    const postsTemplate = posts.map( ({id, title, body}) => `
        <div class="post">
            <div class="number"> ${id} </div>
            <div class="post-info"> 
                <h2 class="post-title"> ${title} </h2>
                <p class="post-body"> ${body} </p>
            </div>
        </div>
    ` ).join('')

    postsContainer.innerHTML += postsTemplate
}

const removeLoader = () => {
    setTimeout( function(){
        loaderContainer.classList.remove('show')
    } , 1000)
}

const showLoader = () => {
    loaderContainer.classList.add('show')
    removeLoader()
}

window.addEventListener('scroll', () => {

    // clientHeight - é a altura interna de um elemento em pixels
    // scrollHeight - é a medida da altura do conteúdo de um elemento, incluindo conteúdo não visível na tela devido ao estouro.
    // scrollTop - obtém ou define o número de pixels quando o conteúdo de um elemento é rolado para baixo. 

    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10

    if (isPageBottomAlmostReached) {
        showLoader()
    }
})

addPostInToDOM()