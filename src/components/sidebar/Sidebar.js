import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebarItem/SidebarItem';


const Sidebar = () => {

    const [state, setState] = useState({

    })

    return (
        <div>
            SIDEBAR
        </div>
    )
}

export default withStyles(styles)(Sidebar)