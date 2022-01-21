let userName = `octocat`


function renderUserInfo(array, ulId) {
    array.forEach(el => {
        let li = document.createElement('li')
        let span = document.createElement('span')
        span.textContent = `${el.login}`
        li.appendChild(span)
        let img = document.createElement('img')
        img.src = el.avatar_url
        img.style.width = '30px'
        li.appendChild(img)
        let a = document.createElement('a')
        a.textContent = el.url
        a.href = el.url
        li.appendChild(a)
        const elUl = document.querySelector(ulId)
        elUl.append(li)

        li.addEventListener('click', e => {
            let name = e.target.textContent
            fetch(`https://api.github.com/users/${name}/repos`).then(res => res.json()).then(data => {
                // e.target.parentNode.childNodes.remove()
                let reposUl = document.querySelector('#repos-list')
                console.log()
                data.forEach(repo => {
                    console.log(repo)
                    let repoLi = document.createElement('a')
                    repoLi.textContent = repo.url
                    reposUl.appendChild(repoLi)
                })
            })
        })
    })
}


let form = document.querySelector('#github-form')
form.addEventListener('submit', e => {
    e.preventDefault()
    let inputValueName = e.target.search.value
    fetch(`https://api.github.com/search/users?q=${inputValueName}`).then(res => res.json()).then(data => {
        let array = data.items
        renderUserInfo(array, '#user-list')
    })
})