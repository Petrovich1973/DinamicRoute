import React, {useState, useContext} from 'react'
import axios from 'axios'
import {ContextApp} from "../reducerApp"

const initializeStateAuthForm = {
    login: '',
    password: ''
}

const Authorization = () => {
    const {state, dispatch} = useContext(ContextApp)
    const [authForm, setAuthForm] = useState(initializeStateAuthForm)
    const {login, password} = authForm

    const onChangeField = field => {
        setAuthForm({...authForm, ...field})
    }

    const onSubmit = () => {

        // const current = {
        //     ...state.current,
        //     login,
        //     auth: true
        // }
        //
        // sessionStorage.setItem('IgniteSecurity', JSON.stringify(current))
        //
        // dispatch({
        //     type: 'updateApp',
        //     payload: {current}
        // })

        (async () => {
            axios('http://localhost:4300/login', {
                method: 'POST',
                data: {email: login, password}
            })
                .then(response => {
                    console.log(response)
                }).catch(err => {
                console.log(err)
            })
        })()

        // (async () => {
        //     axios('http://localhost:4300/register', {
        //         method: 'POST',
        //         data: {email: login, password}
        //     })
        //         .then(response => {
        //             console.log(response)
        //         }).catch(err => {
        //         console.log(err)
        //     })
        // })()

        // (async () => {
        //     axios('http://localhost:4300/roles', {
        //         method: 'GET',
        //         headers: {
        //             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2lnbnRvcmdAeWEucnUiLCJpYXQiOjE1OTYwNDg0NDgsImV4cCI6MTU5NjA1MjA0OCwic3ViIjoiNiJ9.AcGumjly1lRIKQ-KgmT7Ss-mte8eUtIfSs8gFqKVRBE'
        //         }
        //     })
        //         .then(response => {
        //             console.log(response)
        //         }).catch(err => {
        //         console.log(err)
        //     })
        // })()

    }

    const onReset = () => {
        setAuthForm(initializeStateAuthForm)
    }

    return (
        <div className="authorization">
            <h2>Authorization</h2>
            <div>
                <label htmlFor="">Login</label>
                <div>
                    <input type="text" value={login} onChange={e => onChangeField({login: e.target.value})}/>
                </div>
            </div>
            <div style={{height: '1rem'}}/>
            <div>
                <label htmlFor="">Password</label>
                <div>
                    <input type="password" value={password} onChange={e => onChangeField({password: e.target.value})}/>
                </div>
            </div>
            <div style={{height: '1rem'}}/>
            <div>
                <button onClick={onSubmit}>LogIn</button>
                <button className="scheme-perimeter" onClick={onReset}>Reset</button>
            </div>
        </div>
    )
}

export default Authorization