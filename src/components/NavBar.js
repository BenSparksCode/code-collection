import React from 'react'
import { AppBar, IconButton, Typography, Toolbar } from '@material-ui/core'
import { MenuIcon } from '@material-ui/icons';

const NavBar = () => {
    return (
        <div className='navbar'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6">
                        Code Collection
                    </Typography>
                </Toolbar>



            </AppBar>
        </div>
    )
}

export default NavBar