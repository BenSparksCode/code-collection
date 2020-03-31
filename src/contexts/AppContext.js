import React, { createContext, useState, useEffect, useRef } from 'react'

const firebase = require('firebase')

export const AppContext = createContext()

const initialState = {
    selectedNoteIndex: null,
    selectedNote: null,
    notes: null,
}

const AppContextProvider = (props) => {

    const [appState, setAppState] = useState(initialState)

    //Needed to keep track of note selected for when DB updates cause a rerender
    //And useEffect doesn't have access to current appState
    const selectedNoteRef = useRef(null)
    const selectedNoteIndexRef = useRef(null)

    //Helper Ref to handle creating new notes and adding to state
    const newNoteRef = useRef(null)


    //similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        //On component mounting:
        //Get all notes from firebase   
        //Store notes in app state (Snippet Context)

        firebase
            .firestore()
            .collection('notes')
            .onSnapshot(serverUpdate => {
                const notes = serverUpdate.docs.map(doc => {
                    const data = doc.data()
                    data['id'] = doc.id
                    return data
                })

                console.log("Recieved new Firebase data");
                //Effectively settting notes state but in the App Context
                setNotes(notes)
            })

        //NB - the empty [] tells it to only run when component mounts, not every time it updates
    }, [])


    const setNotes = (n) => {
        setAppState({
            ...appState, ...{
                notes: n,
                selectedNoteIndex: selectedNoteIndexRef.current,
                selectedNote: selectedNoteRef.current,
            }
        })
    }


    const selectNote = (n, i) => {
        selectedNoteIndexRef.current = i
        selectedNoteRef.current = n
        setAppState({ ...appState, ...{ selectedNoteIndex: i, selectedNote: n } })
    }


    const deleteNote = (note) => {
        //Getting index of deleted note in array
        const noteIndex = appState.notes.indexOf(note)

        //Adjusting selected notes and indices for when note is removed
        if (appState.selectedNoteIndex === noteIndex) {
            //Changing selected note to null if selected note is deleted
            //So no note is open in editor after being deleted
            selectedNoteIndexRef.current = null
            selectedNoteRef.current = null

            setAppState({
                ...appState, ...{
                    selectedNoteIndex: null,
                    selectedNote: null
                }
            })
        } else {
            if (appState.notes.length > 1) {
                //if many notes - set focus to note before the one deleted 
                selectNote(appState.notes[appState.selectedNoteIndex - 1], appState.selectedNoteIndex - 1)
            } else {
                selectedNoteIndexRef.current = null
                selectedNoteRef.current = null

                setAppState({
                    ...appState, ...{
                        selectedNoteIndex: null,
                        selectedNote: null
                    }
                })
            }
        }

        //Sending delete command to Firebase
        firebase
            .firestore()
            .collection('notes')
            .doc(note.id)
            .delete()
    }

    //TODO: Fix add note behaviour 
    const newNote = async (title) => {
        console.log(appState);

        console.log("new note context fn");
        let note = {
            title: title,
            body: ""
        }

        const newFromDB = await firebase
            .firestore()
            .collection('notes')
            .add({
                title: note.title,
                body: note.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

        const newID = newFromDB.id

        console.log("new note id: ", newID);
        console.log("new note obj: ", newFromDB);

        note['id'] = newID

        console.log(note);

        newNoteRef.current = note

        console.log(newNoteRef.current);

        await setAppState({ ...appState, ...{ notes: [note, ...appState.notes] } })

        const newNoteIndex = appState.notes.indexOf(appState.notes.filter(_note => _note.id === note.id)[0])

        //Updating Ref vars to point to new note as well
        selectedNoteIndexRef.current = newNoteIndex
        selectedNoteRef.current = appState.notes[newNoteIndex]

        setAppState({
            ...appState, ...{
                selectedNote: appState.notes[newNoteIndex],
                selectedNoteIndex: newNoteIndex
            }
        })


        console.log(appState);
    }

    // useEffect(() => {
    //     console.log("USE EFFECT REF WORKED", newNoteRef.current);

    //     const note = newNoteRef.current

    //     console.log(appState);

    //     setAppState({...appState, ...{test:1}})
    //     console.log(appState);


    //     // setAppState({...appState, ...{notes: [note, ...appState.notes]}})

    //     // const newNoteIndex = appState.notes.indexOf(appState.notes.filter(_note => _note.id === note.id)[0])

    //     // //Updating Ref vars to point to new note as well
    //     // selectedNoteIndexRef.current = newNoteIndex
    //     // selectedNoteRef.current = appState.notes[newNoteIndex]

    //     // setAppState({...appState, ...{
    //     //     selectedNote: appState.notes[newNoteIndex],
    //     //     selectedNoteIndex: newNoteIndex
    //     // }})

    // }, [newNoteRef.current])

    
    const noteUpdate = (id, noteObj) => {

        console.log(id, noteObj)

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