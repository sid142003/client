import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { FaBars } from 'react-icons/fa';
import Logo from '../assets/logo.webp';
function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [token, setToken] = React.useState(false);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    useEffect(() => {   
      const token = localStorage.getItem('token');
        if (token) {
            console.log('token exists');
            setToken(true);
           

        }
    }, []);


    const handleSignOut = () => {
        localStorage.removeItem('token');
        setToken(false);
        navigate('/');
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="primary" elevation={4}>
            <Toolbar>
            <img src={ Logo} alt=""  

                 style={{width: '50px', height: '50px', borderRadius: '50%'}}   />
                
                <div style={{ flexGrow: 1 }} />
                {isMobile ? (
                    <>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleMenu}
                        >
                             <FaBars />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                           {token &&( 
                            <>
                            
                            <MenuItem onClick={
                                () => navigate('/events')
                            }>Events</MenuItem>
                            <MenuItem onClick={
                                () => navigate('/create-event')
                            }>Host an Event</MenuItem>
                            
                            </>
                            )}
                            
                            {!token && (
                <>
                    <MenuItem onClick={
                        () => navigate('/')
                    } >Sign In</MenuItem>
                    <MenuItem  onClick={
                        () => navigate('/register')
                    }>Register</MenuItem>
                </>
            )}
            {token && (
                <>

                    <MenuItem onClick={ handleSignOut}>Sign Out</MenuItem>
                </>
            )}

                        </Menu>
                    </>
                ) : (
                    <>
                      {token &&( 
                            <>
                             
                            <MenuItem onClick={
                                () => navigate('/events')
                            }>Events</MenuItem>
                            <MenuItem onClick={
                                () => navigate('/create-event')
                            }>Host an Event</MenuItem>
                            
                            </>
                            )}
                        
                        {!token && (
                <>
                   <MenuItem onClick={
                        () => navigate('/')
                    } >Sign In</MenuItem>
                    <MenuItem  onClick={
                        () => navigate('/register')
                    }>Register</MenuItem>
                </>
            )}
            {token && (
                <>

                    <MenuItem onClick={ handleSignOut}>Sign Out</MenuItem>
                </>
            )}

                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
