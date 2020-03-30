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
    //typing check to avoid DB updates on opening the notes
    const [isTyping, setIsTyping] = useState(false)

    //Debounced Write Text to Firebase
    const debouncedText = useDebounce(text, 2000)

    //Listen for changes in Debounced Text before writing to Firebase
    useEffect(() => {
        if(text && isTyping){
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
        if(appState.selectedNoteIndex >= 0){
            console.log(appState);
            setText(appState.selectedNote.body)
            setId(appState.selectedNote.id)
            setTitle(appState.selectedNote.title)
        }
        //empty [] to immitate componentDidMount
    }, [])

    //In place of componentDidUpdate
    useEffect(() => {
        if(appState.selectedNoteIndex >= 0){
            setText(appState.selectedNote.body)
            setId(appState.selectedNote.id)
            setTitle(appState.selectedNote.title)
        }
        //Runs on this var changed
    }, [appState.selectedNoteIndex])


    const updateBody = (val) => {
        setText(val)
        
        console.log(val);
    }

    //Solves notes updating DB after being opened but no typing
    const keysTyped = (e) => {
        setIsTyping(true)
    }

    return (
        <div className={classes.editorContainer}>
            <ReactQuill
                value={text}
                onChange={updateBody}
                onKeyUp={keysTyped}
                >
            </ReactQuill>
        </div>
    )
}

export default withStyles(styles)(Editor)