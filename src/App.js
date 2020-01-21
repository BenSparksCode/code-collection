import React from 'react';

import SnippetContextProvider from './contexts/SnippetContext'

import NavBar from './components/NavBar'
import FilterMenu from './components/FilterMenu'
import SnippetListPanel from './components/SnippetListPanel'
import SnippetViewPanel from './components/SnippetViewPanel'
import Footer from './components/Footer'


function App() {
  return (
    <div className="App">
      <NavBar />

      <SnippetContextProvider>

        <FilterMenu />
        <div className='snippet-panel-container'>
          <SnippetListPanel />
          <SnippetViewPanel />
        </div>

      </SnippetContextProvider>

      <Footer />
    </div>
  );
}

export default App;
