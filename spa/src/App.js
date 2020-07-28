import React, {useReducer} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {ContextApp, initializeApp, reducerApp} from "./reducerApp"

import Authentication from "./pages/Authentication"
import Users from "./pages/Users"
import Roles from "./pages/Roles"
import NotFound from "./pages/NotFound"

import './App.css'
import './themes/theme_light-scheme/index.css'
import Header from "./components/Header";


function App() {
    const [state, dispatch] = useReducer(reducerApp, initializeApp)

    const {auth} = state.current

    return (
        <ContextApp.Provider value={{dispatch, state}}>

            <Router>

                <Header {...{mode: auth ? 'USER' : 'GUEST'}}/>

                <Switch>


                    {auth && <Route exact path={`/users`} component={Users}/>}
                    {auth && <Route path={`/roles`} component={Roles}/>}
                    {!auth && <Route path={`/login`} component={Authentication}/>}

                    <Route component={NotFound}/>

                </Switch>

            </Router>

        </ContextApp.Provider>
    )
}

export default App
