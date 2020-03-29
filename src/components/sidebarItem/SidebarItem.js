import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../../helpers';



const SidebarItem = (props) => {

    const { _index, _note, classes, selectedNoteIndex } = props

    return (
        <div>
            Lil item
        </div>
    )
}


export default withStyles(styles)(SidebarItem)