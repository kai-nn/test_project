import React, {createContext, useState} from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {links, linksDefault} from "./general/const";

export const Context = React.createContext(null)

function App() {
    const [context, setContext] = useState({user: 'Войти', links: linksDefault})
    return (
    <Context.Provider value={[context, setContext]}>
        <Header/>
        <Main/>
    </Context.Provider>
    );
}

export default App;
