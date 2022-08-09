import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, ThemeProvider} from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#64832C',
            light: '#9bb945',
            dark: '#42611c',
        },
        secondary: {
            main: '#763a9f',
            light: '#b577c8',
            dark: '#4a2c83',
        }
    },
})


ReactDOM.render(
    <ThemeProvider theme={theme}>

        <App/>
    </ThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
