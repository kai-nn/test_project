import React, {useContext} from 'react'
import {HOST} from "../../../general/const";
import {Store} from "../../../App";
import {links} from "../../../general/const";
import {useNavigate} from "react-router-dom";
import './Login.css'


const Login = () => {

    const [store, setStore] = useContext(Store)
    const navigate = useNavigate();

    const enter = (event) => {
        event.preventDefault()
        const user = {
            name: event.target.elements.login.value,
            password: event.target.elements.password.value,
            scope: null,
            id: null,
            secret: null
        }
        console.log(user)
        if ((user.name.length < 3) || (user.password.length < 3)) {
            alert('Введенные данные не корректны')
            return
        }
        sendData(user)
    }

    const sendData = (user) => {
        let url = new URL(`${HOST}/login`)
        fetch(
            url,
            {
                method: 'post',
                body: `grant_type=&username=${user.name}&password=${user.password}&scope=${user.scope}&client_id=${user.id}&client_secret=${user.secret}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json',
                },
            }
        )
            .then(res => res.json())
            .then(result => {
                if(!!result.access_token){
                    localStorage.setItem('token', result.access_token)
                    setStore({user: user.name, links: links})
                    navigate('/list')
                } else {
                    alert(result.detail)
                    localStorage.clear()
                }
                // console.log(localStorage.getItem('token'))
            })
    }


    return (
        <form className='login_frame' onSubmit={event => enter(event)}>
            <h3>Введите</h3>
            <input type='text' name='login' placeholder='Login'/>
            <input type='password' name='password' placeholder='Password'/>
            <input type='submit' className='btn' value='Войти' />
        </form>
    )
}

export default Login