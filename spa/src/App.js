import React, {useReducer, useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'

import {ContextApp, initializeApp, reducerApp} from "./reducerApp"

import Posts from './Posts'
import Topics from "./Topics"
import Topic from "./Topic"

import './App.css'
import './themes/theme_light-scheme/index.css'


function App() {
    const [state, dispatch] = useReducer(reducerApp, initializeApp)
    const [profile, setProfile] = useState(null)
    const {name = null} = profile || {}

    useEffect(() => {
        const load = async () => {
            const response = await fetch('http://localhost:4300/profile')
            const data = await response.json()
            setProfile(data)
        }
        load()
    }, [])

    return (
        <ContextApp.Provider value={{dispatch, state}}>
            <Router>

                <header>
                    {name ? <h1>{name}</h1> : <span>waiting...</span>}
                    <Link to={'/'}>Posts</Link>
                    <Link to={'/topics'}>Topics</Link>
                </header>

                <Switch>
                    <Redirect exact from='/' to='/posts'/>
                    <Route exact path={`/posts**`}>
                        <Posts/>
                    </Route>
                    <Route exact path={`/topics**`}>
                        <Topics/>
                    </Route>
                    <Route exact path={`/test`}>
                        <Topic/>
                    </Route>
                </Switch>

            </Router>
        </ContextApp.Provider>
    )
}

export default App
