import React from 'react'

const Home = () => {


const user = {username: 'alex', password: '123', scope: null, id: null, secret: null}
fetch(
    'http://79.143.31.216/login',
    {
        method: 'post',
        body: `grant_type=&username=${user.username}&password=${user.password}&scope=${user.scope}&client_id=${user.id}&client_secret=${user.secret}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json',
        },
    }
)
    .then(res => res.json())
    .then(result => {
            !!result.access_token
                ? localStorage.setItem('token', result.access_token)
                : localStorage.clear()
            console.log(localStorage.getItem('token'))
        }
    )



// squeeze (сжатие ссылки)
url = new URL('http://79.143.31.216/squeeze')
url.searchParams.set('link', 'https://fonts.google.com/icons?selected=Material+Icons')
console.log(url)

fetch(
    url,
    {
        method: 'post',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    }
)
    .then(res => res.json())
    .then(result => {
            console.log(result)
        }
    )



// statistics
url = new URL('http://79.143.31.216/statistics')
url.searchParams.set('order', 'asc_short')
url.searchParams.set('offset', '1')
url.searchParams.set('limit', '5')
console.log(url)


fetch(
    url,
    {
        method: 'get',
        headers:
            {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },

    }
)
    .then(res => res.json())
    .then(result => console.log('statistics', result))



// redirect
function openTab() {
    url = new URL('http://79.143.31.216/s/MOCAJ')
    console.log('redirect url', url)
    window.open(url);
}


    return (
        <div>
            Работаем...
            <button onClick={() => openTab()}>Click me!</button>
        </div>
    )
}

export default Home