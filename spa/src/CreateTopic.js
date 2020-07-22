import React, {useContext, useEffect, useState} from "react"
import {ContextApp} from "./reducerApp"
import {useParams, useHistory} from 'react-router-dom'

function CreateTopic() {
    const {state, dispatch} = useContext(ContextApp)
    const {topics = []} = state
    const {id = null} = useParams()
    const history = useHistory()

    const [waiting, setWaiting] = useState(true)
    const [topic, setTopic] = useState({})
    const [topicScheme, setTopicScheme] = useState({})
    const [advancedMode, setAdvancedMode] = useState(false)

    const {config = []} = topic

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        (async () => {

            setWaiting(true)
            try {
                const response = await fetch("http://localhost:4300/topicSceme", {signal})
                const data = await response.json()

                setTopicScheme(data)
                setWaiting(false)
            }
            catch (e) {

            }

        })()

        return function cleanup() {
            abortController.abort()
        }

        // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        setTopic(topicScheme)
    }, [topicScheme])

    const onChangeField = e => {
        const result = {[e.target.name]: e.target.value}

        setTopic({
            ...topic,
            config: config.map(item => {
                const [key] = Object.keys(item)
                if (key !== e.target.name) return item
                return result
            })
        })
    }

    const onChangeFieldMain = e => {
        const result = {[e.target.name]: e.target.value}

        setTopic({
            ...topic,
            ...result
        })
    }

    const rowConfig = (topic['replica-assignment'] && topic['replica-assignment'].length) || false

    const onCreateTopic = () => {

        (async () => {
            const response = await fetch("http://localhost:4300/topics", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(topic)
            });
            const result = await response.json()
            if (result) {
                dispatch({
                    type: 'updateApp',
                    payload: {
                        topics: [...topics, result]
                    }
                })
                setTopic(topicScheme)
                history.push(`/topics/${result.id}`)
            }
        })()
    }

    return (
        <div className="detail align-left">

            {waiting ?
                <h4 style={{marginTop: 0}}>waiting...</h4> :
                <div>
                    <h4 style={{marginTop: 0}}>Новый топик</h4>
                    <ul className="topicConfigList">
                        <li>
                            <small><em>name</em></small>
                            <input name="name" value={topic.name}
                                   onChange={onChangeFieldMain}/>
                        </li>
                        <li>
                            <small><em>partitions</em></small>
                            <input disabled={rowConfig}
                                   name="partitions"
                                   value={rowConfig ? '' : topic.partitions}
                                   onChange={onChangeFieldMain}/>
                        </li>
                        <li>
                            <small><em>replication-factor</em></small>
                            <input disabled={rowConfig}
                                   name="replication-factor"
                                   value={rowConfig ? '' : topic['replication-factor']}
                                   onChange={onChangeFieldMain}/>
                        </li>
                        <li>
                            <small><em>replica-assignment</em></small>
                            <input name="replica-assignment" value={topic['replica-assignment']}
                                   onChange={onChangeFieldMain}/>
                        </li>
                    </ul>
                    <div
                        onClick={() => {
                            if (!advancedMode) setAdvancedMode(true)
                        }}
                        style={{padding: '1rem', backgroundColor: '#eee', marginTop: '1rem'}}>
                        {!advancedMode ?
                            <h5>Расширенная конфигурация +</h5> :
                            <h5 onClick={() => setAdvancedMode(false)}>Скрыть -</h5>}
                        {advancedMode ? <ul className="topicConfigList">
                            {config.map((item, idx) => {
                                const [key] = Object.keys(item)

                                return (
                                    <li key={idx}>
                                        <small><em>{key}</em></small>
                                        <input name={key} value={item[key]} onChange={onChangeField}/>
                                    </li>
                                )
                            })}
                        </ul> : null}
                        {advancedMode && <h5 onClick={() => setAdvancedMode(false)}>Скрыть -</h5>}
                    </div>

                    <div style={{marginTop: '2rem'}}>
                        <button onClick={onCreateTopic}>Создать топик</button>
                    </div>
                </div>}

        </div>
    )
}

export default CreateTopic
