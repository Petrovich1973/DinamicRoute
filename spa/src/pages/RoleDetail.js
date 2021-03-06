import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useParams} from 'react-router-dom'

const RoleDetail = () => {

    const [waiting, setWaiting] = useState(false)
    const [role, setRole] = useState(null)

    const {
        name = '',
        permissions = {},
        dfltAll = false
    } = role || {}

    const isAllEmpty = !Object.keys(permissions)
        .some(el => Object.keys(permissions[el]).length)

    const {id} = useParams()

    useEffect(() => {

        (async () => {
            const {token = null} = JSON.parse(localStorage.getItem('IgniteSecurity')) || {}
            setWaiting(true)
            try {
                const response = await axios.get(`http://localhost:4300/roles/${id}`, {
                    headers: {'Authorization': token}
                })
                const result = await response.data
                setRole(result)
                setWaiting(false)
            }
            catch (err) {
                console.error(err)
            }

        })()

        // eslint-disable-next-line
    }, [])

    const renderCells = (keyTask, task) => {
        return (
            <>
                <td>
                    <nobr>
                        {keyTask === '*' ?
                            'for all classes' :
                            keyTask}
                    </nobr>
                </td>
                <td>
                    {task.map((cache, idCache) => (
                        <label key={idCache}>{cache}</label>
                    ))}
                </td>
            </>
        )
    }

    return (
        <section className="align-center">

            <h3>{name}</h3>

            {waiting && <div>waiting...</div>}
            {dfltAll && <div><p>Super Role</p></div>}
            {isAllEmpty && <div><p>all rights, does not change</p></div>}
            {role && !dfltAll && !isAllEmpty && <table className="table_detail_role">

                {Object.keys(permissions).map((key, i) => {
                    const perm = permissions[key]
                    const rowSpan = perm && Object.keys(perm).length
                    return (
                        <tbody key={i}>
                        <tr>
                            <td rowSpan={rowSpan || 1}><strong>{key}</strong></td>
                            {perm && !rowSpan && <>
                                <td colSpan={2}/>
                            </>}
                            {perm && rowSpan < 2 && Object.keys(perm).slice(0, 1).map((keyTask, idTask) => {
                                const task = perm[keyTask]
                                return (
                                    <React.Fragment key={idTask}>
                                        {renderCells(keyTask, task)}
                                    </React.Fragment>
                                )
                            })}
                        </tr>
                        {perm && rowSpan > 1 && Object.keys(perm).slice(1).map((keyTask, idTask) => {
                            const task = perm[keyTask]
                            return (
                                <tr key={idTask}>
                                    {renderCells(keyTask, task)}
                                </tr>
                            )
                        })}
                        </tbody>
                    )
                })}

            </table>}
        </section>
    )
}

export default RoleDetail