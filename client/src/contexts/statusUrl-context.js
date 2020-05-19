import React, { useReducer, useEffect, createContext, useContext } from "react";

export const StatusUrlContext = createContext();
export const useStatusUrl = () => useContext(StatusUrlContext);

export const StatusUrlProvider = (props) => {

    let initialState = {
        serverUrl: "",
        clientUrl: ""
    }

    const statusUrlReducer = (state, action) => {
        switch (action.type) {
            case 'DEVELOPMENT':
                return {
                    ...state,
                    serverUrl: 'http://localhost:5000',
                    clientUrl: 'http://localhost:3000'
                };
            case 'PRODUCTION':
                return {
                    ...state,
                    serverUrl: 'https://ecommerce-webapp-jb.herokuapp.com',
                    clientUrl: 'https://ecommerce-webapp-jb.herokuapp.com'
                };
            default: {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
        }
    }

    const [state, dispatch] = useReducer(statusUrlReducer, initialState)

    const handleUrlChange = () => {
        if(state.serverUrl === "" && process.env.NODE_ENV === "development") {
            dispatch({ type: 'DEVELOPMENT' })
        } else if (state.serverUrl === "" && process.env.NODE_ENV === "production") {
            dispatch({ type: 'PRODUCTION' })
        }
    }

    useEffect(() => {
        handleUrlChange()
          console.log(state)
    }, [initialState])

    let configObj = {
        serverUrl: state.serverUrl,
        clientUrl: state.clientUrl
    }

    return (
        <StatusUrlContext.Provider value={configObj}>
            {props.children}
        </StatusUrlContext.Provider>
    )
}