import React, {useState, useEffect, useContext} from "react"
import {ContextApp} from "../reducerApp"
import {Switch, Route, useHistory, Link} from "react-router-dom"
import axios from "axios"
import CreateUser from "./CreateUser"
import UserDetail from "./UserDetail"

function Users() {
    const {state, dispatch} = useContext(ContextApp)
    const {users = []} = state
    const [waiting, setWaiting] = useState(false)
    const [firstRequest, setFirstRequest] = useState(false)

    const history = useHistory()

    useEffect(() => {

        (async () => {
            const {token = null} = JSON.parse(localStorage.getItem('IgniteSecurity')) || {}
            setWaiting(true)
            try {
                const response = await axios.get("http://localhost:4300/users", {headers: {'Authorization': token}})
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
            catch (err) {
                console.error(err)
            }

        })()

        // eslint-disable-next-line
    }, [])

    const handleClickRemoveTopic = id => {
        console.log(id)
    }

    return (
        <section className="align-center">
            <nav>
                <Link to={'/users'}>List Users</Link>
                <Link to={'/users/createUser'} className="scheme-info">Create User</Link>
            </nav>
            <Switch>
                <Route exact path={`/users`}>
                    <>
                        <h3>List Roles</h3>
                        {waiting && <p>waiting...</p>}
                        {users.length ? (
                            <table className="table list" style={{width: 'auto'}}>
                                <tbody>
                                {users.map(({id, login, roles}, idx) => {
                                    return (
                                        <tr
                                            key={idx}
                                            onClick={(e) => {
                                                if (e.target.tagName !== "BUTTON") {
                                                    history.push(`/users/${id}`)
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
                            firstRequest ? <p>no users</p> : null
                        )}
                    </>
                </Route>
                <Route exact path={`/users/createUser`}>
                    <CreateUser/>
                </Route>
                <Route exact path={`/users/:id`}>
                    <UserDetail/>
                </Route>
            </Switch>
        </section>
    );
}

export default Users;