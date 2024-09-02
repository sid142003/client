import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0', // Purple
    },
    secondary: {
      main: '#000', // Black
    },
    background: {
      default: '#fff', // White
    },
    text: {
      primary: '#000', // Black
      secondary: 'grey', // White
    },
  },
  Typography: {
   
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontSize: '2.5rem', // Larger for impact
      fontWeight: 500,
      color: '#9c27b0' // Primary theme color
    },
    h2: {
      fontSize: '1.75rem',
      color: '#303030', // Soft black for text
      marginBottom: '1rem'
    },
    body1: {
      lineHeight: '1.5'
    }
  },
  
  components: {
    // For specific component customization
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white', // White text on buttons
          backgroundColor: '#9c27b0', // Purple background
          '&:hover': {
            backgroundColor: '#7b1fa2', // Darker purple on hover

          },

          
        },
      },
    },
  },
});

export default  theme;