import React, {useState, useEffect, useContext} from "react"
import {ContextApp} from "../reducerApp"
import {Switch, Route, useHistory, Link} from "react-router-dom"
import axios from "axios"
import CreateRole from "./CreateRole"
import RoleDetail from "./RoleDetail"

function Roles() {
    const {state, dispatch} = useContext(ContextApp)
    const {roles = []} = state
    const [waiting, setWaiting] = useState(false)
    const [firstRequest, setFirstRequest] = useState(false)

    const history = useHistory()

    useEffect(() => {

        (async () => {
            const {token = null} = JSON.parse(localStorage.getItem('IgniteSecurity')) || {}
            setWaiting(true)
            try {
                const response = await axios.get("http://localhost:4300/roles", {
                    headers: {'Authorization': token}
                })
                const result = await response.data
                dispatch({
                    type: 'updateApp',
                    payload: {
                        roles: result
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
                <Link to={'/roles'}>List Roles</Link>
                <Link to={'/roles/createRole'} className="scheme-info">Create Role</Link>
            </nav>
            <Switch>
                <Route exact path={`/roles`}>
                    <>
                        <h3>List Roles</h3>
                        {waiting && <p>waiting...</p>}
                        {roles.length ? (
                            <table className="table list">
                                <tbody>
                                {roles.map(({id, name, permissions = {}}, idx) => {
                                    return (
                                        <tr
                                            key={idx}
                                            onClick={(e) => {
                                                if (e.target.tagName !== "BUTTON") {
                                                    history.push(`/roles/${id}`)
                                                }
                                            }}>
                                            <td>{name}</td>
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
                            firstRequest ? <p>no roles</p> : null
                        )}
                    </>
                </Route>
                <Route exact path={`/roles/createRole`}>
                    <CreateRole/>
                </Route>
                <Route exact path={`/roles/:id`}>
                    <RoleDetail/>
                </Route>
            </Switch>
        </section>
    );
}

export default Roles