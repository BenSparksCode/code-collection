import React, { createContext, useState } from 'react'

export const SnippetContext = createContext()

const initialState = {
    selectedSnippet: false,
    snippetListFull: [],
    snippetListFiltered: []
}

const SnippetContextProvider = (props) => {

    const [snippetState, setSnippetState] = useState(initialState)

    const testSet = (text) => {
        setSnippetState({
            ...snippetState, ...{selectedSnippet: text}
        })
    }



    return (
        <SnippetContext.Provider value={{snippetState, testSet}}>
            {props.children}
        </SnippetContext.Provider>
    )
}

export default SnippetContextProvider