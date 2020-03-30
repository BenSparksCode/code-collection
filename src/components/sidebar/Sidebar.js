import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebarItem/SidebarItem';

import { AppContext } from '../../contexts/AppContext'


const Sidebar = (props) => {

    const { selectNote } = useContext(AppContext)

    const { notes, classes, selectedNoteIndex } = props

    const [addingNote, setAddingNote] = useState(false)
    const [title, setTitle] = useState(null)

    const newNoteBtnClicked = () => {
        setAddingNote(!addingNote)
    }

    const updateTitle = (t) => {
        setTitle(t)
    }

    const newNote = () => {

    }


    if (notes) {
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
                                    onClick={newNote}>Submit Note</Button>
                            </div>
                        ) : null
                }
                <List>
                    {
                        notes.map((_note, _index) => {
                            return (
                                <div className='' key={_index}>
                                    <SidebarItem
                                        _note={_note}
                                        _index={_index}
                                        selectedNoteIndex={selectedNoteIndex} />
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