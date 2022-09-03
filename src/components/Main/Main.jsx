import React from 'react'
import {Route, Routes} from "react-router-dom";
import Task from "./Task/Task";
import Register from "./Register/Register";
import List from "./List/List";
import Login from "./Login/Login";
import './Main.css'

const Main = () => {

    return (
        <div className='main_frame'>
            <Routes>
                <Route path="/" element={<Task />}/>
                <Route path="/register" element={<Register />} />
                <Route path="/list" element={<List />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    )
}

export default Main