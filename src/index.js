import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import AppContextProvider from './contexts/AppContext'

const firebase = require('firebase')

require('firebase/firestore')

//TODO: Move API key to gitignore
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJkaJHFBGd5L9auWfO905aJ7OgQmP-hdU",
    authDomain: "codecollection-b7006.firebaseapp.com",
    databaseURL: "https://codecollection-b7006.firebaseio.com",
    projectId: "codecollection-b7006",
    storageBucket: "codecollection-b7006.appspot.com",
    messagingSenderId: "624713247568",
    appId: "1:624713247568:web:ee98843803de71568b9a55",
    measurementId: "G-3CV792GJZ2"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
(<AppContextProvider>
    <App />
</AppContextProvider>)
, document.getElementById('code-collection-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
