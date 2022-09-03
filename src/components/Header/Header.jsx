import React, {useContext} from 'react'
import {Link, useNavigate} from "react-router-dom";
import './Header.css'
import {useLocation} from "react-router";
import {Context} from "../../App";
import {links, linksDefault} from "../../general/const";

const Header = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate();

    const [context, setContext] = useContext(Context)

    return (
        <div className="header_frame">
            <div className="logo">
                Сервис конвертации ссылок
            </div>
            <ul className="menu">
                {context.links.map((el, id) => {
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
                <a onClick={() => navigate('/login')}>{context.user}</a>
            </div>
        </div>
    )
}

export default Header