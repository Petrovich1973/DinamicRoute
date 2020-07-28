import React from "react"

export const ContextApp = React.createContext()

export const initializeApp = {

    waiting: false,

    current: {
        version: '1.0.0',
        login: "not login",
        auth: false,
        addPermission: true,
        updatePermission: true,
        deletePermission: true,
        checksumPermission: true,
        showPermission: true
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
        default:
            return state
    }
}