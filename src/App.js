import React, { useContext, useEffect } from 'react';

import { AppContext } from './contexts/AppContext'
import Sidebar from './components/sidebar/Sidebar'
import Editor from './components/editor/Editor'

import './App.css'

const firebase = require('firebase')

const App = () => {

  const { appState, setNotes } = useContext(AppContext)


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
        //Effectively settting notes state but in the App Context
        setNotes(notes)
      })

    //NB - the epmty [] tells it to only run when component mounts, not every time it updates
  }, [])


  return (
    <div className="app-container">
      <Sidebar
        selectedNoteIndex={appState.selectedNoteIndex}
        notes={appState.notes}
      />
      {
        appState.selectedNoteIndex !== null ?
          (
            <Editor />
          ) : (
            <div></div>
          )
      }

    </div>
  );
}

export default App;
