import React from "react"

export const ContextApp = React.createContext()

export const initializeApp = {

    waiting: false,

    current: {
        version: '1.0.0',
        login: "not login",
        auth: false,
        addPermission: false,
        updatePermission: false,
        deletePermission: false,
        checksumPermission: false,
        showPermission: false
    },

    users: [],

    roles: []
}

export const reducerApp = (state, action) => {
    switch (action.type) {
        case 'updateApp':
            return {
                ...state,
                ...action.payload
            }
        case 'resetCurrent':
            return {
                ...state,
                current: initializeApp.current
            }
        default:
            return state
    }
}