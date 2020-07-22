import React, {useEffect, useContext} from "react"
import {ContextApp} from "./reducerApp"
import {useParams} from 'react-router-dom'
import FormCommentAdd from "./forms/FormCommentAdd"

function Post() {
    const {state, dispatch} = useContext(ContextApp)
    const {post = {}, comments = [], waiting = false} = state

    const {id = null} = useParams()

    const {title = '', author = ''} = post

    useEffect(() => {
        return () => {
            dispatch({
                type: 'updateApp',
                payload: {
                    post: {},
                    comments: []
                }
            })
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {

        (async () => {

            const urls = [
                `http://localhost:4300/posts/${id}`,
                `http://localhost:4300/comments?postId=${id}`
            ]

            dispatch({
                type: 'updateApp',
                payload: {
                    waiting: true
                }
            })

            const response = await Promise.all(urls.map(u => fetch(u)))
                .then(responses => {
                    return Promise.all(responses.map(res => res.json()))
                }).then((res) => {
                    return res
                })

            const [dataPost, dataComments] = response

            dispatch({
                type: 'updateApp',
                payload: {
                    post: dataPost,
                    waiting: false,
                    comments: dataComments
                }
            })

        })()

        // eslint-disable-next-line
    }, [id])

    const sendMessage = async (message) => {

        dispatch({
            type: 'updateApp',
            payload: {
                waiting: true
            }
        })

        const responseComments = await fetch("http://localhost:4300/comments", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({postId: id, body: message})
        })

        const success = await responseComments.json()

        dispatch({
            type: 'updateApp',
            payload: {
                waiting: false,
                comments: [...comments, success]
            }
        })
    }

    return (
        <div className="detail align-left">

            {!waiting || title ? (
                <>
                    <h2 className="word-wrap" style={{lineHeight: 1}}>{title}</h2>
                    <div>
                        <small><em>author</em></small>
                        <div><strong>{author}</strong></div>
                    </div>
                    <hr/>
                    {!comments.length ? <p>Комментариев пока нет</p> : <h4>Комментарии</h4>}
                    <div className="comments-list">
                        {comments.map((row, idx) => <div key={idx} className="comments-list__item">
                            <small>{row.body}</small>
                        </div>)}
                    </div>
                    <FormCommentAdd idPost={id} disabled={waiting} onSendMessage={sendMessage}/>
                </>
            ) : (
                <p>Ожидание ответа...</p>
            )}


        </div>
    )
}

export default Post
