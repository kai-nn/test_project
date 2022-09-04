import React, {createContext, useState} from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {links, linksDefault} from "./general/const";

export const Store = React.createContext(null)

function App() {
    const [store, setStore] = useState({user: 'Войти', links: linksDefault})
    return (
    <Store.Provider value={[store, setStore]}>
        <Header/>
        <Main/>
    </Store.Provider>
    );
}

export default App;
