import React, { useContext } from 'react'
import { SnippetContext } from '../contexts/SnippetContext'

const FilterMenu = () => {
    const { snippetState } = useContext(SnippetContext)

    return (
        <div className='filter-menu-container'>
            Filter Menu:
            {snippetState.selectedSnippet}
        </div>
    )
}


export default FilterMenu