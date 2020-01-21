import React, { useContext } from 'react'
import { SnippetContext } from '../contexts/SnippetContext'

const SnippetViewPanel = () => {
    const { snippetState, testSet } = useContext(SnippetContext)

    const runTestSet = () => {
        testSet("testing... 1, 2...")
    }

    return (
        <div className='snippet-view-container'>
            Snippet View Panel
            <div className="code-input-container">
                Input here
            </div>

            <button onClick={runTestSet}>Test Context</button>

            <div className="code-preview-container">
                Output here
            </div>
        </div>
    )
}

export default SnippetViewPanel