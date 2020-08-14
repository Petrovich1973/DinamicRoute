import {useState, useEffect} from "react"

export const useFilter = ({list = [], filter = {}}) => {
    const [_list, setList] = useState([])
    const [_filter, setFilter] = useState({})

    useEffect(() => {
        setList(list)
        setFilter(filter)
    }, [list, filter])

    const onFilter = (el) => {
        const filterKeys = Object.keys(_filter)

        return !filterKeys
            .map((key) => {
                const {type = "", value = "", defaultValue = ""} = _filter[key]

                switch (type) {
                    case "text":
                        return handleText(value, el[key])

                    case "range":
                        return handleRange(value, el[key])

                    case "select":
                        return handleSelect(value, el[key], defaultValue)

                    default:
                        return true
                }
            })
            .some((s) => !s)
    }

    // type = text
    const handleText = (filterValue, ElementValue) => {
        if (!filterValue.length) return 1
        return JSON.stringify(ElementValue).includes(filterValue)
    }

    // type = select
    const handleSelect = (filterValue, ElementValue, defaultValue) => {
        if (filterValue === defaultValue) return 1
        return ElementValue === filterValue
    }

    // type = range
    const handleRange = (filterValue, ElementValue) => {
        const fieldValue = filterValue.replace(/\s+/g, " ")

        if (!fieldValue.length) return 1

        const isNumber = (v) => !isNaN(v)

        if (fieldValue.length) {
            const [first = "", second = ""] = fieldValue.split(" ")

            if (first === "" && second === "") return 1

            if (
                first !== "" &&
                second !== "" &&
                isNumber(first) &&
                isNumber(second)
            ) {
                return (
                    Number(ElementValue) >= Number(first) &&
                    Number(ElementValue) <= Number(second)
                )
            }

            if (first === "" && second !== "" && isNumber(second)) {
                return Number(ElementValue) <= Number(second)
            }

            if (first !== "" && second === "" && isNumber(second)) {
                if (fieldValue.split(" ").length === 1)
                    return Number(ElementValue) === Number(first)
                return Number(ElementValue) >= Number(first)
            }
        }
    }

    return _list.filter(onFilter)
}