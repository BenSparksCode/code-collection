import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const initialState = {
    //From tutorial
    selectedNoteIndex: null,
    seletedNote: null,
    notes: null,

    //from old app
    // selectedSnippet: false,
    // snippetListFull: [],
    // snippetListFiltered: []
}

const AppContextProvider = (props) => {

    const [appState, setAppState] = useState(initialState)

    const setNotes = (n) => {
        setAppState({...appState, ...{notes: n}})
    }


    return (
        <AppContext.Provider value={{appState, setNotes}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider