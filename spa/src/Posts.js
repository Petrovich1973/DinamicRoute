import React, {useState, useEffect, useContext} from "react"
import {ContextApp} from "./reducerApp"
import {Switch, Route, useHistory} from "react-router-dom"
import classnames from "classnames"
import ModalDialog from "./ModalDialog"
import FormPostEdit from "./forms/FormPostEdit"
import FormPostAdd from "./forms/FormPostAdd"

import Post from "./Post";

const initialDataModeEdit = {id: "", title: "", author: ""}

function Posts() {
    const {state, dispatch} = useContext(ContextApp)
    const {posts = [], post = {}, waiting = false} = state
    const [idPost, setIdPost] = useState(null)
    const [dataModeEdit, setDataModeEdit] = useState(initialDataModeEdit)
    const [mode, setMode] = useState(null)

    const history = useHistory()

    useEffect(() => {
        setIdPost(post.id)
    }, [post])

    useEffect(() => {
        const load = async () => {
            dispatch({
                type: 'updateApp',
                payload: {
                    posts: null
                }
            })
            const response = await fetch("http://localhost:4300/posts")
            const data = await response.json()
            dispatch({
                type: 'updateApp',
                payload: {
                    posts: data
                }
            })
        };
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSavePostAdd = data => {
        const addPost = async () => {
            dispatch({
                type: 'updateApp',
                payload: {
                    waiting: true
                }
            })
            const response = await fetch("http://localhost:4300/posts", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await response.json()
            if (result) {
                setMode(null)
                dispatch({
                    type: 'updateApp',
                    payload: {
                        posts: [...posts, result],
                        waiting: false
                    }
                })
            }

        };
        addPost()
    }

    const onSavePostEdit = data => {
        const updatePost = async () => {
            dispatch({
                type: 'updateApp',
                payload: {
                    waiting: true
                }
            })
            const response = await fetch(
                `http://localhost:4300/posts/${data.id}`,
                {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }
            )
            const result = await response.json()
            if (result) {
                setMode(null)
                dispatch({
                    type: 'updateApp',
                    payload: {
                        posts: posts.map((item) => {
                            if (data.id !== item.id) return item
                            return data
                        }),
                        waiting: false
                    }
                })
                setDataModeEdit(initialDataModeEdit)
            }
        }
        updatePost()
    }

    const handleClickRemovePost = (id) => {
        const removePost = async () => {
            dispatch({
                type: 'updateApp',
                payload: {
                    waiting: true
                }
            })
            const response = await fetch(`http://localhost:4300/posts/${id}`, {
                method: "DELETE",
                mode: "cors"
            })
            const data = await response.json()
            if (data) {
                dispatch({
                    type: 'updateApp',
                    payload: {
                        posts: posts.filter((item) => item.id !== id),
                        waiting: false
                    }
                })
            }
        }
        removePost()
    }

    const handleClickModeEditPost = (id) => {
        setDataModeEdit(posts.find((item) => item.id === id))
        setMode("EDIT")
    }

    const handleClickModeAddPost = () => {
        setMode("ADD")
    }

    const closeModalAll = () => {
        setMode(null);
    }

    return (
        <section className="align-center">
            <div className="panel">
                <button className="scheme-info" onClick={handleClickModeAddPost}>
                    <span className="big">+</span>
                    &nbsp;&nbsp;
                    <span className="uppercase">Create post</span>
                </button>
            </div>
            <div className="main">
                <div>
                    {posts ? (
                        <table className="table list">
                            <tbody>
                            {posts.length ? (
                                posts.map(({id, title, author}, idx) => {
                                    return (
                                        <tr
                                            className={classnames(idPost === id && 'active')}
                                            key={idx}
                                            onClick={(e) => {
                                            if (e.target.tagName !== "BUTTON") {
                                                history.push(`/posts/${id}`)
                                            }
                                        }}>
                                            <td>{id}</td>
                                            <td>
                                                <div className="word-wrap" style={{minWidth: '200px'}}>{title}</div>
                                            </td>
                                            <td>{author}</td>
                                            <td>
                                                <button
                                                    className="scheme-error"
                                                    disabled={waiting}
                                                    onClick={() => handleClickRemovePost(id)}>
                                                    &#10006;
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="scheme-warning"
                                                    onClick={() => handleClickModeEditPost(id)}>
                                                    редактировать
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td>Топики не получены</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    ) : (
                        <p>Ожидание получения топиков...</p>
                    )}
                </div>
                <Switch>
                    <Route exact path={`/posts/:id`}>
                        <Post/>
                    </Route>
                </Switch>
            </div>
            {mode === "EDIT" ? (
                <ModalDialog
                    colorScheme='scheme-warning'
                    title={dataModeEdit.title}
                    onClose={closeModalAll}>
                    <FormPostEdit
                        post={dataModeEdit}
                        disabled={waiting}
                        onSavePost={onSavePostEdit}/>
                </ModalDialog>
            ) : null}
            {mode === "ADD" ? (
                <ModalDialog
                    colorScheme='scheme-info'
                    title={'Новый пост'}
                    onClose={closeModalAll}>
                    <FormPostAdd
                        disabled={waiting}
                        onSavePost={onSavePostAdd}/>
                </ModalDialog>
            ) : null}
        </section>
    );
}

export default Posts;
