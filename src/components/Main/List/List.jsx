import React, {useEffect, useState} from 'react'
import {HOST} from "../../../general/const";
import Squeeze from "./Squeeze/Squeeze";
import Pagination from "./Pagination/Pagination";
import {useNavigate} from "react-router-dom";
import './List.css'


const List = () => {

    const navigate = useNavigate();
    const [list, setList] = useState([])
    const [order, setOrder] = useState({field: 'short', direction: true})
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(10)
    const [count, setCount] = useState(10)
    const [loading, setLoading] = useState(false)

    if(localStorage.getItem('token') === null) {
        // console.log(localStorage.getItem('token'))
        alert('Сеанс работы завершен. Пройдите авторизацию')
        navigate('/login')
    }

    useEffect(() => {
        getStatistic(100000).then(data => {
            setCount(data.length)
            setList(data)
        })
    }, [loading])


    useEffect(() => {
        getStatistic(limit).then(data => {
            setList(data)
        })
    }, [offset, order])


    const redirect = (short) => {
        let url = new URL(`${HOST}/s/${short}`)
        window.open(url)
        setLoading(!loading)
    }

    const sort = (value) => {
        setOrder(value)
    }


    const getStatistic = async (lim) => {

        const url = new URL(`${HOST}/statistics`)
        const orderVar = order.direction
            ? 'asc_' + order.field
            : 'desc_' + order.field
        url.searchParams.set('order', orderVar)
        url.searchParams.set('offset', String(offset))
        url.searchParams.set('limit', String(lim))

        const res = await fetch(
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
        return await res.json()
    }


    return (
        <div className={'list'}>

            <Pagination offset={offset} limit={limit} count={count} setOffset={setOffset}/>
            <Squeeze loading={loading} setLoading={setLoading} />

            <div className={'table'}>
                <div className={'table_row header'} key={'row_header'}>
                    <div className={'table_cell__id'}>id</div>
                    <div className={'table_cell__short'}
                         value='short'
                         onClick={() => sort({field: 'short', direction: !order.direction})}
                    >
                        short {order.field === 'short' ? (order.direction ? '⬇' : '⬆') : ''}
                    </div>
                    <div className={'table_cell__target'}
                         onClick={() => sort({field: 'target', direction: !order.direction})}
                    >
                        target {order.field === 'target' ? (order.direction ? '⬇' : '⬆') : ''}
                    </div>
                    <div className={'table_cell__counter'}
                         onClick={() => sort({field: 'counter', direction: !order.direction})}
                    >
                        count {order.field === 'counter' ? (order.direction ? '⬇' : '⬆') : ''}
                    </div>
                </div>
                {
                    list?.map( el => {
                        const {id, short, target, counter} = el
                        return (
                            <div className={'table_row'}
                                 key={`row_${id}`}
                                 onClick={() => redirect(short)}
                            >
                                <div className={'table_cell__id'}>{id}</div>
                                <div className={'table_cell__short'}>{short}</div>
                                <div className={'table_cell__target'}>{target}</div>
                                <div className={'table_cell__counter'}>{counter}</div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default List