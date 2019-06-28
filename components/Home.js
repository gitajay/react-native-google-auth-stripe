import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin';

import { _storeData, _retrieveData, _removeData } from '../services/cacheMech'

goToHome = () => {
    GoogleSignin.signOut().then(() => {
        _removeData('userInfo').then(() =>
            Actions.home()
        )
    })
}

goToAddUser = () => {
    Actions.addUser()
}

goToViewUsers = () => {
    Actions.viewUsers()
}

goToDonate = () => {
    Actions.donate()
}

export default class Home extends React.Component {    
   constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }
  componentDidMount() {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId:
        '971072333389-4a2c0cf0lnu3gafsjh87vm93vl848206.apps.googleusercontent.com',
    });
    _retrieveData('userInfo').then(userInfo => {
        const parseUserInfo = JSON.parse(userInfo)
        this.setState({userInfo: parseUserInfo})
    })
  }
  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      //await GoogleSignin.configure()
      const userInfo = await GoogleSignin.signIn();
      _storeData('userInfo', userInfo)
      //console.warn('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.warn('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.warn('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.warn('Play Services Not Available or Outdated');
      } else {
        console.warn('Some Other Error Happened');
      }
    }
  };
  _getCurrentUser = async () => {
    //May be called eg. in the componentDidMount of your main component.
    //This method returns the current user
    //if they already signed in and null otherwise.
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      console.error(error);
    }
  };
  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  _revokeAccess = async () => {
    //Remove your application from the user authorized applications.
    try {
      await GoogleSignin.revokeAccess();
      console.warn('deleted');
    } catch (error) {
      console.error(error);
    }
  };
  MyAvatar = (url) => (
    <Image
        source={{ uri: url }}
        style={{ width: 200, height: 200 }}
        PlaceholderContent={<ActivityIndicator />}
    />
  );
  render() {
    const { userInfo } = this.state
    // console.warn(userInfo ? userInfo.user.photo : null)
    if(userInfo)
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: userInfo.user.photo }}
                    style={{ width: 200, height: 200 }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <Text>{`Successfully Logged bro! ${userInfo.user.name}`}</Text>
                <TouchableOpacity style = {[styles.buttonStyle]} onPress = {goToHome}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[styles.buttonStyle]} onPress = {goToAddUser}>
                    <Text>Add User in Firebase</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[styles.buttonStyle]} onPress = {goToViewUsers}>
                    <Text>List Users in Firebase</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[styles.buttonStyle]} onPress = {goToDonate}>
                    <Text>Donate Us</Text>
                </TouchableOpacity>
            </View>    
        )
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 312, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this._signIn}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    color: 'white',
    marginTop: 20,
    padding: 20,
    backgroundColor: 'green',
    margin: 20,
  }
});
