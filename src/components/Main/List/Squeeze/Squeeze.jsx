import React, {useRef} from 'react'
import {HOST} from "../../../../general/const";
import {useNavigate} from "react-router-dom";
import './Squeeze.css'


const Squeeze = ({loading, setLoading}) => {

    const refUrl = useRef(null)
    const navigate = useNavigate();

    const add = () => {
        if (refUrl.current.value) {
            // if ( !isValidUrl(refUrl.current.value) ){
            //     alert('Недопустимый формат данных!')
            //     return
            // }
            let url = new URL(`${HOST}/squeeze`)
            url.searchParams.set('link', refUrl.current.value)

            fetch(
                url,
                {
                    method: 'post',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            )
                .then(res => res.json())
                .then(result => {
                    // result.detail[0].msg && alert(result.detail[0].msg)
                    setLoading(!loading)
                    }
                )

            refUrl.current.value = null
        } else {
            alert('Данные отсутствуют.')
        }
    }

    // Проверка валидности гиперссылки. Взято на https://badevlad.livejournal.com/39808.html
    // const isValidUrl = (url) => {
    //     const objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i
    //     return objRE.test(url);
    // }

    return (
        <div className={'panel'}>
            <input className={'link'}
                   type='text'
                   ref={refUrl}
                   placeholder={'Введите url'}
            />
            <input className={'add'}
                   type='button'
                   onClick={() => add()}
                   value=' + '
            />
        </div>
    )
}

export default Squeeze