import React, {useReducer, useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import {ContextApp, initializeApp, reducerApp} from "./reducerApp"

import axios from 'axios'

import Header from "./components/Header"
import Authorization from "./pages/Authorization"
import Users from "./pages/Users"
import Roles from "./pages/Roles"
import Profile from "./pages/Profile"
import Logout from "./pages/Logout"
import NotFound from "./pages/NotFound"

import './App.css'
import './themes/theme_light-scheme/index.css'


function App() {
    const [state, dispatch] = useReducer(reducerApp, initializeApp)
    const [flag, setFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const {token = null, user = null} = JSON.parse(localStorage.getItem('IgniteSecurity')) || {}

    const {auth, login, version} = state.current

    useEffect(() => {

        onPingCall()

        // eslint-disable-next-line
    }, [])

    const onPingCall = async () => {

        try {

            axios.get('http://localhost:4300/ping', {headers: {'Authorization': token}})
                .then(() => {
                    const result = {
                        ...state.current,
                        ...user,
                        auth: true,
                        addPermission: true,
                        updatePermission: true,
                        deletePermission: true,
                        checksumPermission: true,
                        showPermission: true
                    }

                    dispatch({
                        type: 'updateApp',
                        payload: {
                            current: result
                        }
                    })
                    setFlag(true)
                })
                .catch(err => {
                    const {response} = {...err}
                    if (response) {
                        setErrorMessage(response.data.message)
                        setTimeout(() => setFlag(true), 2000)
                        // setFlag(true)
                    } else if (!response) {
                        setErrorMessage('ERR_CONNECTION_REFUSED')
                    }
                })


        } catch (err) {

            console.log('err', err)

        }

    }


    if (flag) {
        return (
            <ContextApp.Provider value={{dispatch, state}}>

                <Router>

                    <Header {...{mode: auth ? 'USER' : 'GUEST', login, version}}/>

                    <Switch>

                        <Route path={`/login`} component={Authorization}/>

                        {auth && <Redirect exact from={`/`} to={`/profile`}/>}
                        {auth && <Route path={`/profile`} component={Profile}/>}
                        {auth && <Route path={`/users`} component={Users}/>}
                        {auth && <Route path={`/roles`} component={Roles}/>}
                        {auth && <Route path={`/logout`} component={Logout}/>}
                        {!auth && <Redirect to={`/login`}/>}

                        <Route component={NotFound}/>

                    </Switch>

                </Router>

            </ContextApp.Provider>
        )
    } else if (errorMessage) {
        return (<div
            style={{padding: '3rem 6rem'}}
            className="align-center scheme-error">{errorMessage}</div>)
    }
    return (<div className="align-center">waiting...</div>)
}

export default App
