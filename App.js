import React, { Component } from 'react';
//import { AppRegistry, View } from 'react-native';
import firebase from 'firebase';
import Routes from './components/Routes'

var config = {
  databaseURL: "https://my-mobile-app-2ced6.firebaseio.com",
  projectId: "my-mobile-app-2ced6",
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

class App extends Component {
   render() {
      return (
         <Routes />
      )
   }
}
export default App