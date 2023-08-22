import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, ThemeProvider} from '@mui/material';
import AppWithRedux from './AppWithRedux';
import {store} from './state/store';
import {Provider} from 'react-redux';

export const theme = createTheme({
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

// React 17
// ReactDOM.render(
//     <Provider store={store}>
//         <ThemeProvider theme={theme}>
//             <App/>
//         </ThemeProvider>
//     </Provider>
//     , document.getElementById('root'));


// React 18
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppWithRedux/>
        </ThemeProvider>
    </Provider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
