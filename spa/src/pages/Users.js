import React, {useState, useEffect, useContext} from "react"
import {ContextApp} from "../reducerApp"
import {Switch, Route, useHistory} from "react-router-dom"
import axios from "axios"
import classnames from "classnames"
import CreateUser from "./CreateUser"
import UserDetail from "./UserDetail"

function Users() {
    const {state, dispatch} = useContext(ContextApp)
    const {users = []} = state
    const [waiting, setWaiting] = useState(false)
    const [firstRequest, setFirstRequest] = useState(false)
    const [detailId, setDetailId] = useState(null)

    const history = useHistory()

    useEffect(() => {

        (async () => {
            const {token = null} = JSON.parse(localStorage.getItem('IgniteSecurity')) || {}
            setWaiting(true)
            try {
                const response = await axios.get("http://localhost:4300/users", { headers: { 'Authorization': token } })
                const result = await response.data
                dispatch({
                    type: 'updateApp',
                    payload: {
                        users: result
                    }
                })
                setWaiting(false)
                setFirstRequest(true)
            }
            catch (e) {

            }

        })()

        // eslint-disable-next-line
    }, [])

    const handleClickModeCreateTopic = () => {
        history.push(`/users/createUser`)
    }

    const handleClickEditTopic = id => {
        history.push(`/users/${id}`)
    }

    const handleClickRemoveTopic = id => {
        console.log(id)
    }

    return (
        <section className="align-center">
            <div className="panel">
                <button className="scheme-info" onClick={handleClickModeCreateTopic}>
                    <span className="big">+</span>
                    &nbsp;&nbsp;
                    <span className="uppercase">Добавить пользователя</span>
                </button>
            </div>
            <div className="main">
                <div style={{flex: 1}}>
                    {waiting && <p>waiting...</p>}
                    {users.length ? (
                        <table className="table list" style={{width: '100%'}}>
                            <tbody>
                            {users.map(({id, login, roles}, idx) => {
                                return (
                                    <tr
                                        className={classnames(detailId === id && 'active')}
                                        key={idx}
                                        onClick={(e) => {
                                            if (e.target.tagName !== "BUTTON") {
                                                handleClickEditTopic(id)
                                            }
                                        }}>
                                        <td>{login}</td>
                                        <td>{roles.join(', ')}</td>
                                        <td>
                                            <button
                                                className="scheme-error"
                                                disabled={waiting}
                                                onClick={() => handleClickRemoveTopic(id)}>
                                                &#10006;
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    ) : (
                        firstRequest ? <p>Топиков нет</p> : null
                    )}
                </div>
                <Switch>
                    <Route exact path={`/users/createUser`}>
                        <CreateUser/>
                    </Route>
                    <Route exact path={`/users/:id`}>
                        <UserDetail/>
                    </Route>
                </Switch>
            </div>
        </section>
    );
}

export default Users;