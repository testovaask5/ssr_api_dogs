const root = document.getElementById('root')

if (window.SSR) checkPathname()

window.onpopstate = function (event) {
    checkPathname()
}

function checkPathname(id) {
    const pathname = document.location.pathname
    if (pathname === '/dogs/' || pathname === '/dogs') renderDogs()
    if (pathname === '/dogs/new') renderNewDog()
    if (id) renderDog(id)
}

function redirect(event, id) {
    event.preventDefault()
    history.pushState({}, '', event.target.getAttribute('href'))
    checkPathname(id)
}

async function renderDog(id) {
    const response = await fetch('/api/dog/' + id)
    if (response.ok) {
        const dog = await response.json()
        root.innerHTML = `<div>ID: ${dog.id}</div>
        <div>Name: ${dog.name}</div>
        <div>Breed: ${dog.breed}</div>
        <div>Age: ${dog.age}</div>
        <div>Create: ${dog.createdAt}</div>
        <button>Edit</button>
        <button onclick="confirm('Are you sure?')">Remove</button>
        `
    }
}

function renderDogs() {
    fetch('/api/dog').then(response => response.json()).then(dogs => {
        const list = dogs.reduce((acc, dog) => acc + 
            `<li><a onclick="redirect(event, ${dog.id})" href="/dogs/${dog.id}">${dog.name}</a></li>`, 
        '')
        const template = `<ul>${list}</ul>
        <a onclick="redirect(event)" href="/dogs/new">Create a dog!!!</a>`
        root.innerHTML = template
        if (window.SSR) finishRender()
    })
}

function renderNewDog() {
    root.innerHTML = `<a onclick="redirect(event)" href="/dogs/">Back to the main page</a>
    <form onsubmit="createDog(event)" id="create-dog" action="/api/dog">
        <label>Name: <input name="name" type="text"></label>
        <label>Breed: <input name="breed" type="text"></label>
        <label>Age: <input name="age" type="text"></label>
        <button type="submit">Create</button>
    </form>`
    if (window.SSR) finishRender()
}

async function createDog(event) {
    event.preventDefault()
    const form = event.target
    const response = await fetch('/api/dog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: form[0].value,
            breed: form[1].value,
            age: form[2].value,
        })
    })
    if (response.ok) {
        history.pushState({}, '', '/dogs/')
        checkPathname()
    }
}