import React from 'react'
import {NavLink} from 'react-router-dom'
import {IconLogo, IconUser} from '../svg'

const Header = ({mode = 'GUEST', login = null, version = null}) => {

    const logo = (
        <>
            <h1 className="logoApp">
                <IconLogo size={36}/>
                <span>Ignite</span>
            </h1>
            <h3 className="nameApp">
                Security console
                {version && <span className="version">version {version}</span>}
            </h3>
        </>
    )

    if (mode === 'GUEST') {
        return (
            <header style={{justifyContent: 'center'}}>
                <div>
                    {logo}
                </div>
            </header>
        )
    } else if (mode === 'USER') {
        return (
            <header>
                <div>
                    {logo}
                    <div style={{width: '1rem'}}/>
                    <NavLink to={'/users'}>Users</NavLink>
                    <NavLink to={'/roles'}>Roles</NavLink>
                </div>
                <div>
                    <div style={{width: '2rem'}}/>
                    <NavLink to={'/profile'}>
                        <small>Profile</small>
                    </NavLink>
                    {login && <>
                        <IconUser size={24}/>
                        <span style={{marginLeft: '.5rem'}}>{login}</span>
                    </>}
                    <NavLink to={'/logout'}>
                        <small>Logout</small>
                    </NavLink>
                </div>
            </header>
        )
    } else {
        return null
    }
}

export default Header