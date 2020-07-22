import React, {useState, useEffect} from 'react'

const dataInitial = {id: null, title: '', author: ''}

const styleWraper = {
    padding: '1rem'
}

const FormPostEdit = ({post = dataInitial, disabled = false, onSavePost = Function}) => {
    const [data, setData] = useState(dataInitial)

    const onChange = e => {
        const name = e.target.name
        const value = e.target.value
        setData({...data, [name]: value})
    }

    useEffect(() => {
        setData({...data, ...post})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])

    return (
        <div className="align-left" style={styleWraper}>
            <table className="form-table">
                <tbody>
                <tr>
                    <td className="align-right form-table__label">title</td>
                    <td>
                        <input
                            autoFocus
                            autoComplete={'off'}
                            disabled={disabled}
                            name="title"
                            onChange={onChange}
                            value={data.title}/>
                    </td>
                </tr>
                <tr>
                    <td className="align-right form-table__label">author</td>
                    <td>
                        <input
                            autoComplete={'off'}
                            disabled={disabled}
                            name="author"
                            onChange={onChange}
                            value={data.author}/>
                    </td>
                </tr>
                </tbody>
            </table>
            &nbsp;
            <div className="align-right">
                <button disabled={disabled} onClick={() => onSavePost(data)}>
                    Сохранить пост
                </button>
            </div>
        </div>
    )
}

export default FormPostEdit