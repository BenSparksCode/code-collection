import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../../helpers';

import { AppContext } from '../../contexts/AppContext'


const SidebarItem = (props) => {

    const { selectNote, deleteNote } = useContext(AppContext)

    const { _index, _note, classes, selectedNoteIndex } = props

    const deleteNoteClicked = (note) => {
        if(window.confirm(`Are you sure you want to delete:\n\n${note.title}`)){
            deleteNote(note)
        }
    }

    return (
        <div
            key={_index}>
            <ListItem 
                className={classes.ListItem}
                selected={selectedNoteIndex === _index}
                alignItems='flex-start'>
                    <div
                        className={classes.textSection}
                        onClick={() => selectNote(_note, _index)}>
                            <ListItemText
                                primary={_note.title}
                                secondary={removeHTMLTags(_note.body.substring(0,30))+'...'}>

                            </ListItemText>
                    </div>
                    <DeleteIcon
                        className={classes.deleteIcon}
                        onClick={()=>deleteNoteClicked(_note)}

                        ></DeleteIcon>
            </ListItem>
        </div>
    )
}


export default withStyles(styles)(SidebarItem)