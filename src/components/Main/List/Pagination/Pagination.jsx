import React, {useEffect, useState} from 'react'
import './Pagination.css'

const Pagination = ({offset, limit, count, setOffset}) => {

    const pageCount = Math.ceil(count/limit)

    const items = [...Array(pageCount).keys()]

    return (
        <div className={'frame'}>
            {
                items.map((e, i) => {
                    const active = offset === i ? 'group_active' : 'group'
                    return (
                        <a className={active}
                           key={`group_${e}`}
                           onClick={() => setOffset(i)}
                        >
                            {e + 1}
                        </a>
                    )
                })
            }
        </div>
    )
}

export default Pagination
