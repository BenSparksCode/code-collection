import React, { createContext, useState } from 'react'

const firebase = require('firebase')

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
        setAppState({ ...appState, ...{ notes: n } })
    }

    const selectNote = (n, i) => {
        setAppState({ ...appState, ...{ selectedNoteIndex: i, selectedNote: n } })
    }

    const deleteNote = (note) => {

    }

    const newNote = (note) => {

    }

    const noteUpdate = (id, noteObj) => {
        firebase
            .firestore()
            .collection('notes')
            .doc(id)
            .update({
                title: noteObj.title,
                body: noteObj.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
    }


    return (
        <AppContext.Provider value={{ appState, setNotes, selectNote, deleteNote, newNote, noteUpdate }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider