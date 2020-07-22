import React, {useContext, useEffect, useState} from "react"
import {ContextApp} from "./reducerApp"
import {useParams} from 'react-router-dom'

function Topic() {
    const {state, dispatch} = useContext(ContextApp)
    const {topic = {}} = state
    const [waiting, setWaiting] = useState(false)

    const {id = null} = useParams()

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal; // без точки с запятой TypeError )))

        (async () => {

            setWaiting(true)
            dispatch({
                type: 'updateApp',
                payload: {
                    topic: {}
                }
            })
            try {
                const response = await fetch(`http://localhost:4300/topics/${id}`, {signal})
                const result = await response.json()
                dispatch({
                    type: 'updateApp',
                    payload: {
                        topic: result
                    }
                })
                setWaiting(false)
            }
            catch (e) {

            }

        })()

        return function cleanup() {
            abortController.abort()
        }

    }, [id, dispatch])

    useEffect(() => {
        return () => {
            dispatch({
                type: 'updateApp',
                payload: {
                    topic: {}
                }
            })
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="detail align-left">

            {waiting ? <h2>waiting...</h2> : <h2>Topic {topic.name}</h2>}

        </div>
    )
}

export default Topic
