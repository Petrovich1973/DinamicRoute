import React, {useReducer, useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch, NavLink, Redirect} from 'react-router-dom'

import {ContextApp, initializeApp, reducerApp} from "./reducerApp"

import Users from "./pages/Users"
import Roles from "./pages/Roles"

import './App.css'
import './themes/theme_light-scheme/index.css'


function App() {
    const [state, dispatch] = useReducer(reducerApp, initializeApp)

    return (
        <ContextApp.Provider value={{dispatch, state}}>

            <Router>

                <header>
                    <h1>Sberbank</h1>
                    <NavLink to={'/users'}>Users</NavLink>
                    <NavLink to={'/roles'}>Roles</NavLink>
                </header>

                <Switch>
                    <Redirect exact from='/' to='/users'/>
                    <Route exact path={`/users**`}>
                        <Users/>
                    </Route>
                    <Route exact path={`/roles**`}>
                        <Roles/>
                    </Route>
                </Switch>

            </Router>

        </ContextApp.Provider>
    )
}

export default App
