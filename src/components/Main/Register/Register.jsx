import React from 'react'
import './Register.css'
import {HOST} from "../../../general/const";


const Register = () => {

    const register = (event) => {
        event.preventDefault()
        const user = {name: event.target.elements.login.value, password: event.target.elements.password.value}
        console.log(user)
        if ((user.name.length < 3) || (user.password.length < 3)) {
            alert('Введенные данные не корректны')
            return
        }
        sendData(user)
    }

    const sendData = (user) => {
        let url = new URL(`${HOST}/register`)
        url.searchParams.set('username', user.name)
        url.searchParams.set('password', user.password)
        console.log(url)

        fetch(
            url,
            {
                method: 'post',
                // headers:
                //     {
                    // accept: 'application/json',
                    // 'Authentication': `Bearer ???`
                // },

            }
        )
            .then(res => res.json())
            .then(result => {
                console.log('result', result)
                if(!!result.username){
                    alert('Регистрация прошла успешно.')
                } else {
                    alert(result.detail)
                }
            })
        }

    return (
        <form className='register_frame' onSubmit={event => register(event)}>
            <h3>Введите</h3>
            <input type='text' name='login' placeholder='Login'/>
            <input type='password' name='password' placeholder='Password'/>
            <input type='submit' className='btn' value='Зарегистрироваться' />
        </form>
    )
}

export default Register