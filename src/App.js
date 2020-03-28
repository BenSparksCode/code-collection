import React, { useContext, useEffect } from 'react';

import { AppContext } from './contexts/AppContext'

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
        //setting state here
        //set notes in state to the new notes array mapped here
        console.log(notes);
        //Effectively settting notes state but in the App Context
        setNotes(notes)
      })

    //NB - the epmty [] tells it to only run when component mounts, not every time it updates
  }, [])



  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
