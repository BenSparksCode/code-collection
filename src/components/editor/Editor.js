import React, { useState, useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import useDebounce from '../../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import { AppContext } from '../../contexts/AppContext'

const Editor = (props) => {

    const {  selectedNote, selectedNoteIndex, noteUpdate } = useContext(AppContext)

    const { classes } = props

    //State stuff
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')
    //typing check to avoid DB updates on opening the notes
    const [isTyping, setIsTyping] = useState(false)

    //Debounced Write Text to Firebase
    const debouncedBody = useDebounce(text, 2000)
    const debouncedTitle = useDebounce(title, 2000)

    //Title
    //Listen for changes in Debounced Text before writing to Firebase
    useEffect(() => {
        if (title && isTyping) {
            //DB UPDATE called here
            noteUpdate(id, {
                title: title,
                body: text
            })
            console.log("Updating title in DB");
            setIsTyping(false)
        }
    }, [debouncedTitle])

    //BODY
    //Listen for changes in Debounced Text before writing to Firebase
    useEffect(() => {
        if (text && isTyping) {
            //DB UPDATE called here
            noteUpdate(id, {
                title: title,
                body: text
            })
            console.log("Updating body in DB");
            setIsTyping(false)
        }
    }, [debouncedBody])

    //In place of componentDidMount
    useEffect(() => {
        if (selectedNoteIndex >= 0) {

            setText(selectedNote.body)
            setId(selectedNote.id)
            setTitle(selectedNote.title)
        }
        //empty [] to immitate componentDidMount
    }, [])

    //In place of componentDidUpdate
    useEffect(() => {
        if (selectedNoteIndex >= 0) {
            setText(selectedNote.body)
            setId(selectedNote.id)
            setTitle(selectedNote.title)
        }
        //Runs on this var changed
    }, [selectedNoteIndex])


    const updateBody = (val) => {
        setText(val)
    }

    const updateTitle = (val) => {
        setTitle(val)
    }

    //Solves notes updating DB after being opened but no typing
    const keysTyped = (e) => {
        setIsTyping(true)
    }
    

    return (
        <div className={classes.editorContainer}>

            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>

            <input
                className={classes.titleInput}
                type="text"
                placeholder='Note title...'
                value={title ? title : ''}
                onChange={(e) => updateTitle(e.target.value)}
                onKeyUp={keysTyped}>

            </input>

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