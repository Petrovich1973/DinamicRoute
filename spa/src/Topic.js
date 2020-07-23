import React, {useContext, useEffect, useState} from "react"
import {ContextApp} from "./reducerApp"
import {useParams} from 'react-router-dom'

function Topic() {
    const {state, dispatch} = useContext(ContextApp);
    const {topic = {}} = state;
    const [waiting, setWaiting] = useState(false);
    const [topicForm, setTopicForm] = useState({});
    const [elementsWaiting, setElementsWaiting] = useState([]);

    const {config = []} = topicForm

    const {id = null} = useParams()

    useEffect(() => {
        setTopicForm(topic)
        // eslint-disable-next-line
    }, [topic])

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

    const onChangeField = e => {
        const result = {[e.target.name]: e.target.value}

        setTopicForm({
            ...topicForm,
            config: config.map(item => {
                const [key] = Object.keys(item)
                if (key !== e.target.name) return item
                return result
            })
        })
    }

    const onKeyUpField = e => {
        const isEnter = e.keyCode === 13
        const elementName = e.target.name
        if(isEnter) {
            (async () => {

                const abortController = new AbortController();
                const signal = abortController.signal; // без точки с запятой TypeError )))

                setElementsWaiting([...elementsWaiting, elementName])

                if ("activeElement" in document) document.activeElement.blur();

                try {
                    const response = await fetch(`http://localhost:4300/topics/${id}`, {
                        signal,
                        method: "PUT",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(topicForm)
                    })
                    const result = await response.json()
                    dispatch({
                        type: 'updateApp',
                        payload: {
                            topic: result
                        }
                    })
                    setElementsWaiting(elementsWaiting.filter(item => item !== elementName))
                }
                catch (e) {

                }

            })()
        }
    }

    const onChangeFieldMain = e => {
        const result = {[e.target.name]: e.target.value}

        setTopicForm({
            ...topicForm,
            ...result
        })
    }

    const rowConfig = (topicForm['replica-assignment'] && topicForm['replica-assignment'].length) || false

    return (
        <div className="detail align-left">
            <small><em>Topic</em></small>
            {waiting ? <h2>waiting...</h2> : null}
            {Object.keys(topicForm).length ? <ul className="topicConfigList editInputList">
                <li>
                    <input
                        className="title"
                        autoComplete="off"
                        name="name"
                        value={'name' in topicForm && topicForm.name}
                        onChange={onChangeFieldMain}/>
                </li>
                <li>
                    <small><em>partitions</em></small>
                    <input
                        autoComplete="off"
                        name="partitions"
                        value={'partitions' in topicForm && rowConfig ? '' : topicForm.partitions}
                        onChange={onChangeFieldMain}/>
                </li>
                <li>
                    <small><em>replication-factor</em></small>
                    <input
                        autoComplete="off"
                        name="replication-factor"
                        value={'replication-factor' in topicForm && rowConfig ? '' : topicForm['replication-factor']}
                        onChange={onChangeFieldMain}/>
                </li>
                <li>
                    <small><em>replica-assignment</em></small>
                    <input
                        autoComplete="off"
                        name="replica-assignment"
                        placeholder={!('replica-assignment' in topicForm && topicForm['replica-assignment']) ? '---' : ''}
                        value={'replica-assignment' in topicForm && topicForm['replica-assignment']}
                        onChange={onChangeFieldMain}/>
                </li>
            </ul> : null}
            <p>&nbsp;</p>
            <ul className="topicConfigList editInputList">
                {config.map((item, idx) => {
                    const [key] = Object.keys(item)

                    return (
                        <li key={idx}>
                            <small><em>{key}</em></small>
                            <input
                                disabled={elementsWaiting.includes(key)}
                                name={key}
                                value={item[key]}
                                placeholder={!item[key] ? '---' : ''}
                                onKeyUp={onKeyUpField}
                                onChange={onChangeField}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Topic
