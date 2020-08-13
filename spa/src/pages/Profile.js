import React, {useState} from 'react'

const initList = [
    {name: 'Alex', age: '23', gender: 'male', skills: ['javascript']},
    {name: 'Oleg', age: '34', gender: 'male', skills: ['java', 'scala']},
    {name: 'Olga', age: '43', gender: 'female', skills: ['python', 'ruby']},
    {name: 'Alla', age: '18', gender: 'female', skills: ['javascript', 'html', 'css']}
]

const initFilter = {
    name: '',
    age: '',
    gender: 'noselect',
    skills: ''
}

const options = [
    {label: 'no select', value: 'noselect'},
    {label: 'male', value: 'male'},
    {label: 'female', value: 'female'},
]

const Profile = () => {

    const [list, setList] = useState(initList)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState(initFilter)

    const onReset = () => setFilter(initFilter)

    const useFilter = element => {

        const isTest = key => {
            if (!filter[key].length) return 1
            return element[key].toLowerCase().includes(filter[key].toLowerCase())
        }

        const isSelect = (key, def) => {
            if (filter[key] === def) return 1
            return element[key] === filter[key]
        }

        const isList = key => {
            if (!filter[key].length) return 1
            return element[key].join().toLowerCase().includes(filter[key].toLowerCase())
        }

        return (
            isTest('name') &&
            isTest('age') &&
            isSelect('gender', 'noselect') &&
            isList('skills')
        )

    }

    return (
        <section className="align-center">
            <h3>Profile</h3>
            <div>
                Здесь инфрмация о пользователе
            </div>
            <div style={{height: 20}}/>
            <div style={{width: 850, display: 'inline-block'}}>
                <input
                    autoComplete={'off'}
                    style={{width: '100%'}}
                    type="text"
                    name="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}/>
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
                                value={filter.name}
                                onChange={e => setFilter({
                                    ...filter,
                                    [e.target.name]: e.target.value
                                })}/>
                        </th>
                        <th>
                            <input
                                autoComplete={'off'}
                                type="text"
                                name="age"
                                value={filter.age}
                                onChange={e => setFilter({
                                    ...filter,
                                    [e.target.name]: e.target.value
                                })}/>
                        </th>
                        <th>
                            <select
                                name="gender"
                                value={filter.gender}
                                onChange={e => setFilter({
                                    ...filter,
                                    [e.target.name]: e.target.value
                                })}>
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
                                value={filter.skills}
                                onChange={e => setFilter({
                                    ...filter,
                                    [e.target.name]: e.target.value
                                })}/>
                        </th>
                        <th>
                            <button onClick={onReset}>Reset filter</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.filter(useFilter).map((row, idRow) => (
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