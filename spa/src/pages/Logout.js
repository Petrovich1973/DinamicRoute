import React, {useContext} from 'react'
import {ContextApp} from "../reducerApp"

const Logout = () => {
    const {state, dispatch} = useContext(ContextApp)

    const handleClickLogout = async () => {
        sessionStorage.removeItem('IgniteSecurity')
        dispatch({
            type: 'updateApp',
            payload: {
                current: {
                    ...state.current,
                    auth: false
                }
            }
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