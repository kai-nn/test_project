import React from 'react'
import './Register.css'
import {HOST} from "../../../general/const";
import {useNavigate} from "react-router-dom";


const Register = () => {

    const navigate = useNavigate();

    const register = (event) => {
        event.preventDefault()
        const user = {name: event.target.elements.login.value, password: event.target.elements.password.value}
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
                if(!!result.username){
                    alert('Регистрация прошла успешно.')
                    navigate('/login')
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