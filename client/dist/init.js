const root = document.getElementById('root')

if (window.SSR) checkPathname()
// if (window.SSR) finishRender()

window.onpopstate = function (event) {
    checkPathname()
}

function checkPathname() {
    if (document.location.pathname === '/dogs/') renderDogs()
    if (document.location.pathname === '/dogs/new') renderNewDog()
}

function redirect(event) {
    event.preventDefault()
    history.pushState({}, '', event.target.getAttribute('href'))
    checkPathname()
}

function renderDogs() {
    fetch('/api/dog').then(response => response.json()).then(dogs => {
        const list = dogs.reduce((acc, cur) => acc + `<li>${cur.name}</li>`, '')
        const template = `<ul>${list}</ul>
        <a onclick="redirect(event)" href="/dogs/new">Create a dog</a>`
        root.innerHTML = template
        if (window.SSR) finishRender()
    })
}

function renderNewDog() {
    root.innerHTML = `<a onclick="redirect(event)" href="/dogs/">Back to the main page</a>
    <form id="create-dog" action="/api/dog">
        <label>Name: <input name="name" type="text"></label>
        <label>Breed: <input name="breed" type="text"></label>
        <label>Age: <input name="age" type="text"></label>
        <button type="submit">Create</button>
    </form>`
    if (window.SSR) finishRender()
}