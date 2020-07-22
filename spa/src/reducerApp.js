import React from "react"

export const ContextApp = React.createContext()

export const initializeApp = {
    version: '1.0.0',
    waiting: false,

    topics: [],
    topic: {},

    posts: [],
    post: {},

    formPostEdit: {id: null, title: '', author: ''},
    formPostAdd: {title: '', author: ''},
    comments: []
}

export const reducerApp = (state, action) => {
    switch (action.type) {
        case 'updateApp':
            return {
                ...state,
                ...action.payload
            }
        case 'updateFormEdit':
            return {
                ...state,
                formPostEdit: {
                    ...action.payload
                }
            }
        case 'updateFormAdd':
            return {
                ...state,
                formPostAdd: {
                    ...action.payload
                }
            }
        default:
            return state
    }
}