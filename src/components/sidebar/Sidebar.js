import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebarItem/SidebarItem';

import { AppContext } from '../../contexts/AppContext'


const Sidebar = (props) => {

    const { appState, newNote } = useContext(AppContext)

    const { classes } = props

    const [addingNote, setAddingNote] = useState(false)
    const [title, setTitle] = useState(null)

    const newNoteBtnClicked = () => {
        setAddingNote(!addingNote)
    }

    const updateTitle = (t) => {
        setTitle(t)
    }

    const addNewNote = () => {
        newNote(title)
        setAddingNote(false)
    }

    if (appState.notes) {
        return (
            <div className={classes.sidebarContainer}>
                <Button
                    className={classes.newNoteBtn}
                    onClick={newNoteBtnClicked}>
                    {addingNote ? "Cancel" : "New Note"}
                </Button>
                {
                    addingNote ?
                        (
                            <div>
                                <input
                                    type="text"
                                    className={classes.newNoteInput}
                                    placeholder='Enter note title'
                                    onKeyUp={(e) => updateTitle(e.target.value)}
                                >

                                </input>
                                <Button
                                    className={classes.newNoteSubmitBtn}
                                    onClick={addNewNote}>Submit Note</Button>
                            </div>
                        ) : null
                }
                <List>
                    {
                        appState.notes.map((_note, _index) => {
                            return (
                                <div className='' key={_index}>
                                    <SidebarItem
                                        _note={_note}
                                        _index={_index}
                                        selectedNoteIndex={appState.selectedNoteIndex} />
                                    <Divider></Divider>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default withStyles(styles)(Sidebar)