import React, { useState, useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import useDebounce from '../../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import { AppContext } from '../../contexts/AppContext'

const Editor = (props) => {

    const { appState, noteUpdate } = useContext(AppContext)

    const { classes } = props

    //State stuff
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')

    //Debounced Write Text to Firebase
    const debouncedText = useDebounce(text, 2000)

    //Listen for changes in Debounced Text before writing to Firebase
    useEffect(() => {
        if(text){
            //DB UPDATE called here
            noteUpdate(id, {
                title: title,
                body: text
            })
            console.log("Updating DB");
        }
    }, [debouncedText])

    //In place of componentDidMount
    useEffect(() => {
        if(appState.selectedNoteIndex !== null){
            setText(appState.selectedNote.body)
            setId(appState.selectedNote.id)
            setTitle(appState.selectedNote.title)
        }
        //empty [] to immitate componentDidMount
    }, [])

    //In place of componentDidUpdate
    useEffect(() => {
        if(appState.selectedNoteIndex !== null){
            setText(appState.selectedNote.body)
            setId(appState.selectedNote.id)
            setTitle(appState.selectedNote.title)
        }
        //Runs on this var changed
    }, [appState.selectedNoteIndex])


    const updateBody = async (val) => {
        await setText(val)
        console.log(val);
    }

    return (
        <div className={classes.editorContainer}>
            <ReactQuill
                value={text}
                onChange={updateBody}
                >
            </ReactQuill>
        </div>
    )
}

export default withStyles(styles)(Editor)