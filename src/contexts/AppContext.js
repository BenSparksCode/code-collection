import React, { Component, createContext } from 'react'

const firebase = require('firebase')

export const AppContext = createContext()

class AppContextProvider extends Component {

    state = {
        selectedNoteIndex: null,
        selectedNote: null,
        notes: null,
    }

    componentDidMount() {
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
                this.setNotes(notes)
            })
    }

    setNotes = (n) => {
        this.setState({
            notes: n
        })
    }


    selectNote = (n, i) => {
        this.setState({
            selectedNoteIndex: i,
            selectedNote: n
        })
    }


    deleteNote = (note) => {
        //Getting index of deleted note in array
        const noteIndex = this.state.notes.indexOf(note)

        //Adjusting selected notes and indices for when note is removed
        if (this.state.selectedNoteIndex === noteIndex) {
            //Changing selected note to null if selected note is deleted
            //So no note is open in editor after being deleted

            this.setState({
                selectedNoteIndex: null,
                selectedNote: null
            })

        } else {
            if (this.state.notes.length > 1) {
                //if many notes - set focus to note before the one deleted 
                this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
            } else {

                this.setState({
                    selectedNoteIndex: null,
                    selectedNote: null
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
    newNote = async (title) => {

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

        await this.setState({
            notes: [...this.state.notes, note]
        })

        const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === note.id)[0])

        this.setState({
            selectedNote: this.state.notes[newNoteIndex],
            selectedNoteIndex: newNoteIndex
        })

        console.log(this.state);
    }


    noteUpdate = (id, noteObj) => {

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

    render(){
        return(
            <AppContext.Provider value = {{
                ...this.state,
                setNotes: this.setNotes,
                selectNote: this.selectNote,
                deleteNote: this.deleteNote,
                newNote: this.newNote,
                noteUpdate: this.noteUpdate
                }}>
                { this.props.children }
            </AppContext.Provider >
        )
    }

    
}

export default AppContextProvider