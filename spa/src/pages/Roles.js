import React, {useState, useEffect, useContext} from "react"
import {ContextApp} from "../reducerApp"
import {Switch, Route, useHistory} from "react-router-dom"
import axios from "axios"
import classnames from "classnames"
import CreateRole from "./CreateRole"
import RoleDetail from "./RoleDetail"

function Roles() {
    const {state, dispatch} = useContext(ContextApp)
    const {roles = []} = state
    const [waiting, setWaiting] = useState(false)
    const [firstRequest, setFirstRequest] = useState(false)
    const [detailId, setDetailId] = useState(null)

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
            catch (e) {

            }

        })()

        // eslint-disable-next-line
    }, [])

    const handleClickModeCreateTopic = () => {
        history.push(`/roles/createRole`)
    }

    const handleClickEditTopic = id => {
        history.push(`/roles/${id}`)
    }

    const handleClickRemoveTopic = id => {
        console.log(id)
    }

    const viewListRow = (name, perms, listKeys,) => {
        if (!listKeys.length) return
        return (
            <>
                <div><strong>{name}</strong></div>
                <ul className="list__row_subList">
                    {listKeys.map((key, i) => {
                        const content = {
                            __html: perms[key].join('<br/>')
                        }
                        return (
                            <li key={i}>
                                <strong>{key}:</strong>
                                &nbsp;
                                <span dangerouslySetInnerHTML={content}/>
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }

    const onShift = value => {
        setDetailId(value)
        if(!value) setTimeout(() => history.push(`/roles`), 1000)
    }

    return (
        <section className="align-center">
            <div className="panel">
                <button className="scheme-info" onClick={handleClickModeCreateTopic}>
                    <span className="big">+</span>
                    &nbsp;&nbsp;
                    <span className="uppercase">Добавить роль</span>
                </button>
                {detailId}
            </div>
            <div className={classnames("main", {'shift': detailId})}>
                <div style={{flex: 1}}>
                    {waiting && <p>waiting...</p>}
                    {roles.length ? (
                        <table className="table list" style={{width: '100%'}}>
                            <tbody>
                            {roles.map(({id, name, permissions = {}}, idx) => {
                                const {
                                    cachePerms = {},
                                    taskPerms = {},
                                    servicePerms = {},
                                    systemPerms = {}
                                } = permissions
                                const cachePermsKeys = Object.keys(cachePerms)
                                const taskPermsKeys = Object.keys(taskPerms)
                                const servicePermsKeys = Object.keys(servicePerms)
                                const systemPermsKeys = Object.keys(systemPerms)
                                const readOnly = cachePermsKeys.length +
                                    taskPermsKeys.length +
                                    servicePermsKeys.length +
                                    systemPermsKeys.length
                                return (
                                    <tr
                                        className={classnames(detailId === name && 'active')}
                                        key={idx}
                                        onClick={(e) => {
                                            if (e.target.tagName !== "BUTTON") {
                                                handleClickEditTopic(name)
                                            }
                                        }}>
                                        <td>{name}</td>
                                        <td>
                                            {viewListRow('cachePerms',
                                                cachePerms,
                                                cachePermsKeys)}
                                            {viewListRow('taskPerms',
                                                taskPerms,
                                                taskPermsKeys)}
                                            {viewListRow('servicePerms',
                                                servicePerms,
                                                servicePermsKeys)}
                                            {viewListRow('systemPerms',
                                                systemPerms,
                                                systemPermsKeys)}
                                            {!readOnly && <span>Роль неизменяемая</span>}
                                        </td>
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
                        <CreateRole onShift={onShift}/>
                    </Route>
                    <Route exact path={`/roles/:id`}>
                        <RoleDetail/>
                    </Route>
                </Switch>
            </div>
        </section>
    );
}

export default Roles;