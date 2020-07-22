import React, {useState} from 'react'
import classnames from "classnames"

const FormCommentAdd = ({idPost = null, disabled = false, onSendMessage = Function}) => {
    const [message, setMessage] = useState('')

    const onChangeMessage = e => {
        const value = e.target.value
        setMessage(value)
    }

    const onSend = async () => {
        if (idPost) {
            await onSendMessage(message)
            setMessage('')
        } else {
            alert('Отстутствует id Поста')
        }
    }

    return (
        <div className="form-comments">
            <h5>Новый комментарий</h5>
            <div>
                <textarea value={message} onChange={onChangeMessage}/>
                <div>
                    <small><small><em>Минимум 3 символа</em></small></small>
                </div>
            </div>
            <div>
                <button
                    className={classnames(message.trim().length < 3 && 'not-allowed')}
                    style={{height: 'auto'}}
                    onClick={onSend}
                    disabled={message.trim().length < 3 || disabled}>
                    <span className="uppercase">Отправить комментарий</span>
                </button>
            </div>
        </div>
    )
}

export default FormCommentAdd