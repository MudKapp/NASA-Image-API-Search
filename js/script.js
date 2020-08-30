let container
async function getApi(_q) {
    const q = encodeURI(_q);
    const response = await fetch(`https://images-api.nasa.gov/search?q=${q}&media_type=image`)
    const {collection : {items}} = await response.json()
    let shortList = items.map((item) => {
        return {data:item.data,links:item.links}
    })
    shortList = shortList.slice(0,10)
    return shortList
}

const form = document.querySelector('form')

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    let search = document.querySelector('input').value
    let result = await getApi(search)
    createResultNodes(result)
    console.log(result)
    
})

function createResultNodes(result){
    
    if(container !== undefined){
        container.remove()
    }
    container = document.createElement('div')
    container.classList.add('container')
    for (const iterator of result) {
        const div = document.createElement('div')
        const h = document.createElement('h3')
        const p = document.createElement('p')
        const img = document.createElement('img')
        h.textContent = iterator.data[0].title
        img.src = iterator.links[0].href
        p.textContent = iterator.data[0].description
        div.classList.add('element')
        div.appendChild(img)
        div.appendChild(h)
        div.appendChild(p)
        container.appendChild(div)
    }
    document.body.appendChild(container)
}


