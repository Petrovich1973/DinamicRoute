import React, {useReducer} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import {ContextApp, initializeApp, reducerApp} from "./reducerApp"

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

    const {auth, login, version} = state.current

    return (
        <ContextApp.Provider value={{dispatch, state}}>

            <Router>

                <Header {...{mode: auth ? 'USER' : 'GUEST', login, version}}/>

                <Switch>

                    {auth && <Route path={`/users`} component={Users}/>}
                    {auth && <Route path={`/roles`} component={Roles}/>}
                    {auth && <Route path={`/profile`} component={Profile}/>}
                    {auth && <Route path={`/logout`} component={Logout}/>}
                    {auth && <Redirect from={`/login`} to={`/profile`}/>}
                    {auth && <Route component={NotFound}/>}
                    {!auth && <Route path={`/login`} component={Authorization}/>}
                    {!auth && <Redirect to={`/login`}/>}

                    <Route component={NotFound}/>

                </Switch>

            </Router>

        </ContextApp.Provider>
    )
}

export default App
