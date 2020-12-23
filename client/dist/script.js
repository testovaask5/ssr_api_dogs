const root = document.getElementById('root')

if (window.SSR) {
    fetch('/api/dog').then((response) => {
        return response.json()
    }).then((dogs) => {
        let list = ''
        dogs.forEach(dog => {
            list += `<li>${dog.name}</li>`
        })
        // const ul = document.createElement('ul')
        const ul = `<ul>${list}</ul>`
        // ul.innerHTML = list
        // root.append(ul)
        root.innerHTML = ul
        finishRender()
    })
}

console.log('Script.js!!!!')