import React, {useState} from 'react'

const initializeStateAuthForm = {
    login: '',
    password: ''
}

const Authentication = ({onSubmit = Function}) => {
    const [authForm, setAuthForm] = useState(initializeStateAuthForm)
    const {login, password} = authForm
    const onChangeField = field => {
        setAuthForm({...authForm, ...field})
    }
    const onReset = () => {
        setAuthForm(initializeStateAuthForm)
    }
    return (
        <div>
            <h2>Authentication</h2>
            <div>
                <label htmlFor="">Login</label>
                <div>
                    <input type="text" value={login} onChange={e => onChangeField({login: e.target.value})}/>
                </div>
            </div>
            <div>
                <label htmlFor="">Password</label>
                <div>
                    <input type="password" value={password} onChange={e => onChangeField({password: e.target.value})}/>
                </div>
            </div>
            <div>
                <button onClick={onSubmit}>LogIn</button>
                <button onClick={onReset}>Reset</button>
            </div>
        </div>
    )
}

export default Authentication