import React, {useContext} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {Store} from "../../App";
import './Header.css'


const Header = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate();

    const [store, setStore] = useContext(Store)

    return (
        <div className="header_frame">
            <div className="logo">
                Сервис конвертации ссылок
            </div>
            <ul className="menu">
                {store.links.map((el, id) => {
                    const {url, label} = el
                    const activated =
                        url === pathname
                            ? 'menu_activated'
                            : 'menu'
                    return (
                        <Link
                            key={`link_${id}`}
                            to={`${url}`}
                            className={`${activated}`}
                        >
                            {label}
                        </Link>
                    )
                })}
            </ul>

            <div className="user">
                <a onClick={() => navigate('/login')}>{store.user}</a>
            </div>
        </div>
    )
}

export default Header