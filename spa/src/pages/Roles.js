import React, {useState, useEffect, useContext} from "react"
import {ContextApp} from "../reducerApp"
import {Switch, Route, useHistory} from "react-router-dom"
import classnames from "classnames"
import CreateRole from "./CreateRole"

function Roles() {
    const {state, dispatch} = useContext(ContextApp)
    const {roles = []} = state
    const [waiting, setWaiting] = useState(false)
    const [firstRequest, setFirstRequest] = useState(false)
    const [topicId, setTopicId] = useState(null)

    const history = useHistory()

    useEffect(() => {

        (async () => {
            setWaiting(true)
            try {
                const response = await fetch("http://localhost:4300/roles")
                const result = await response.json()
                dispatch({
                    type: 'updateApp',
                    payload: {
                        roles: result
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
        history.push(`/roles/createRole`)
    }

    const handleClickEditTopic = id => {
        history.push(`/topics/${id}`)
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
                    <span className="uppercase">Добавить роль</span>
                </button>
            </div>
            <div className="main">
                <div style={{flex: 1}}>
                    {waiting && <p>waiting...</p>}
                    {roles.length ? (
                        <table className="table list" style={{width: '100%'}}>
                            <tbody>
                            {roles.map(({id, name, partitions}, idx) => {
                                return (
                                    <tr
                                        className={classnames(topicId === id && 'active')}
                                        key={idx}
                                        onClick={(e) => {
                                            if (e.target.tagName !== "BUTTON") {
                                                handleClickEditTopic(id)
                                            }
                                        }}>
                                        <td>{id}</td>
                                        <td>
                                            <div className="word-wrap" style={{minWidth: '200px'}}>{name}</div>
                                        </td>
                                        <td>{partitions}</td>
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
                    <Route exact path={`/roles/createRole`}>
                        <CreateRole/>
                    </Route>
                </Switch>
            </div>
        </section>
    );
}

export default Roles;