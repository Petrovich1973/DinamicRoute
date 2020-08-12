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

    return (
        <section className="align-center">

            <h3>{name}</h3>

            {waiting && <div>waiting...</div>}
            {dfltAll && <div><p>Super Role</p></div>}
            {isAllEmpty && <div><p>all rights, does not change</p></div>}
            {role && !dfltAll && !isAllEmpty && <table className="table_detail_role">
                <tbody>
                {Object.keys(permissions).map((key, i) => {
                    const perm = permissions[key]
                    console.log(perm && Object.keys(perm).length)
                    return (
                        <tr key={i}>
                            <td><strong>{key}</strong></td>
                            <td>
                                <table>
                                    <tbody>
                                    {perm && Object.keys(perm).map((keyTask, idTask) => {
                                        const task = perm[keyTask]
                                        return (
                                            <tr key={idTask}>
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
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>}
        </section>
    )
}

export default RoleDetail