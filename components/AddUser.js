import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Keyboard } from 'react-native'
import { writeUserData } from '../services/users'
import { Actions } from 'react-native-router-flux'

export default AddUser = () => {

    const [ email, setEmail ] = useState('')
    const [ userFName, setUserFName ] = useState('')
    const [ userLName, setUserLName ] = useState('')

    const handleSubmit = () => {
        writeUserData(email, userFName, userLName).then(() => {
            Actions.viewUsers()
        })
    }
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder="Your First name"
                maxLength={20}
                value={userFName}
                onBlur={Keyboard.dismiss}
                onChangeText={setUserFName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Your Last name"
                maxLength={20}
                value={userLName}
                onBlur={Keyboard.dismiss}
                onChangeText={setUserLName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Your Email"
                maxLength={20}
                value={email}
                onBlur={Keyboard.dismiss}
                onChangeText={setEmail}
            />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}
            >
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
      paddingTop: 15
    },
    textInput: {
      borderColor: '#CCCCCC',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      height: 50,
      fontSize: 25,
      paddingLeft: 20,
      paddingRight: 20
    },
    saveButton: {
      borderWidth: 1,
      borderColor: '#007BFF',
      backgroundColor: '#007BFF',
      padding: 15,
      margin: 5
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center'
    }
  });