import React, { useContext } from 'react';

import { AppContext } from './contexts/AppContext'
import Sidebar from './components/sidebar/Sidebar'
import Editor from './components/editor/Editor'

import './App.css'

const App = () => {

  const { appState } = useContext(AppContext)


  


  return (
    <div className="app-container">
      <Sidebar />
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
