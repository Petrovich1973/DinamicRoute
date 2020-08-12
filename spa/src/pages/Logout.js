import React, {useContext} from 'react'
import {ContextApp} from "../reducerApp"

const Logout = () => {
    const {dispatch} = useContext(ContextApp)

    const handleClickLogout = async () => {
        localStorage.removeItem('IgniteSecurity')
        dispatch({
            type: 'resetCurrent'
        })
    }

    return (
        <div className="align-center">
            <h5>Вы будете перенаправлены на страницу авторизации!</h5>
            <button onClick={handleClickLogout}>Продолжить?</button>
        </div>
    )
}

export default Logout