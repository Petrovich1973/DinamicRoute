import React from 'react'
import {NavLink} from 'react-router-dom'

const Header = ({mode = 'GUEST', login = null}) => {
    if(mode === 'GUEST') {
        return (
            <header>
                <h1>Sberbank</h1>
            </header>
        )
    } else if(mode === 'USER') {
        return (
            <header>
                <div>
                    <h1>Sberbank</h1>
                    <NavLink to={'/users'}>Users</NavLink>
                    <NavLink to={'/roles'}>Roles</NavLink>
                </div>
                <div>
                    <NavLink to={'/profile'}>Profile</NavLink>
                    {login && <span>{login}</span>}
                    <NavLink to={'/logout'}>Logout</NavLink>
                </div>
            </header>
        )
    } else {
        return null
    }
}

export default Header