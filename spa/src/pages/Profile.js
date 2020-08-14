import React, {useState} from 'react'
import equal from 'equals'
import {useFilter} from "../useHooks/useFilter"

const initList = [
    {name: 'Alex', age: '23', gender: 'male', skills: ['javascript']},
    {name: 'Oleg', age: '34', gender: 'male', skills: ['java', 'scala']},
    {name: 'Olga', age: '43', gender: 'female', skills: ['python', 'ruby']},
    {name: 'Alla', age: '18', gender: 'female', skills: ['javascript', 'html', 'css']}
]

const initialFilter = {
    name: {
        value: "",
        type: "text"
    },
    age: {
        value: "",
        type: "range"
    },
    gender: {
        value: "noselect",
        type: "select",
        defaultValue: "noselect"
    },
    skills: {
        value: "",
        type: "text"
    }
}

const options = [
    {label: 'no select', value: 'noselect'},
    {label: 'male', value: 'male'},
    {label: 'female', value: 'female'},
]

const Profile = () => {
    const [list, setList] = useState(initList)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState(initialFilter)
    const resultFilter = useFilter({list, filter})

    const onReset = () => setFilter(initialFilter)

    const isEqualFilter = equal(initialFilter, filter)

    const onChangeFilter = e => {
        setFilter({
            ...filter,
            [e.target.name]: {...filter[e.target.name], value: e.target.value}
        })
    }

    const useSearch = element => {
        if (!search.length) return 1
        return JSON.stringify(element).includes(search)
    }

    return (
        <section className="align-center">
            <h3>Profile</h3>
            <div>
                Здесь инфрмация о пользователе
            </div>
            <div style={{height: 20}}/>
            <div className="search">
                <input
                    autoComplete={'off'}
                    style={{width: '100%', paddingRight: '2rem'}}
                    type="text"
                    name="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}/>
                {search && <span
                    title="clear search"
                    className="search__clear"
                    onClick={() => setSearch('')}
                    style={{width: '2rem'}}>&#10005;</span>}
            </div>
            <div style={{height: 20}}/>
            <div>
                <table style={{display: 'inline-table'}}>
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>age</th>
                        <th>gender</th>
                        <th>skills</th>
                        <th/>
                    </tr>
                    <tr>
                        <th>
                            <input
                                autoComplete={'off'}
                                type="text"
                                name="name"
                                value={filter.name.value}
                                onChange={onChangeFilter}/>
                        </th>
                        <th>
                            <input
                                autoComplete={'off'}
                                type="text"
                                name="age"
                                value={filter.age.value}
                                onChange={onChangeFilter}/>
                        </th>
                        <th>
                            <select
                                name="gender"
                                value={filter.gender.value}
                                onChange={onChangeFilter}>
                                {options.map((op, i) => (
                                    <option key={i} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <input
                                autoComplete={'off'}
                                type="text"
                                name="skills"
                                value={filter.skills.value}
                                onChange={onChangeFilter}/>
                        </th>
                        <th>
                            <button
                                disabled={isEqualFilter}
                                onClick={onReset}>Reset filter
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {resultFilter.filter(useSearch).map((row, idRow) => (
                        <tr key={idRow}>
                            {Object.keys(row).map((key, idTd) => {
                                const value = row[key]
                                return (
                                    <td
                                        key={idTd}>
                                        {Array.isArray(value) ?
                                            value.join(', ') :
                                            value}
                                    </td>
                                )
                            })}
                            <td/>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Profile