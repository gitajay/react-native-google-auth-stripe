import firebase from 'firebase';

export function writeUserData(email,fname,lname) {
    return firebase.database().ref('Users/').push({
        email,
        fname,
        lname
    })
}

export function readUserData() {
    //firebase.database().ref('Users/').once('value', function (snapshot) {
      //  console.warn(Object.values(snapshot.val()))
       // return Object.values(snapshot.val())
    //});
    return firebase.database().ref('Users/').orderByChild("fname").limitToFirst(15).once('value')
}