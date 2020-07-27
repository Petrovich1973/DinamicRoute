import React, {useState, useEffect, useContext} from "react"
import {ContextApp} from "../reducerApp"
import {Switch, Route, useHistory} from "react-router-dom"
import classnames from "classnames"

function Users() {
    const {state, dispatch} = useContext(ContextApp)
    const {users = []} = state
    const [waiting, setWaiting] = useState(false)
    const [firstRequest, setFirstRequest] = useState(false)

    const history = useHistory()

    useEffect(() => {

        (async () => {
            setWaiting(true)
            try {
                const response = await fetch("http://localhost:4300/users")
                const result = await response.json()
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
        history.push(`/topics/createTopic`)
    }

    const handleClickEditTopic = id => {
        history.push(`/topics/${id}`)
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
                            {users.map(({id, name, partitions}, idx) => {
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
                    <Route exact path={`/topics/createTopic`}>
                        <CreateTopic/>
                    </Route>
                    <Route exact path={`/topics/:id`}>
                        <Topic/>
                    </Route>
                </Switch>
            </div>
        </section>
    );
}

export default Users;