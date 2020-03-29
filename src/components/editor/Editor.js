import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import useDebounce from '../../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Editor = (props) => {

    const { classes } = props

    //State stuff
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')

    //Debounced Write Text to Firebase
    const debouncedText = useDebounce(text, 1500)

    //Listen for changes in Debounced Text before writing to Firebase
    useEffect(() => {
        if(text){
            //UPDATE DB CALL here
            console.log("Updating DB");
        }
    }, [debouncedText])


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