import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // createRoot instead of render
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
