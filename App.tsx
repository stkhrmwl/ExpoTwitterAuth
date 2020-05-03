import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// external components
import { useTwitter } from 'react-native-simple-twitter';

// firebase
import firebase from 'firebase';

// secret keys
import ENV from './env.json';

// Initialize Firebase
const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DATABASE_URL,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
  measurementId: ENV.FIREBASE_MEASUREMENT_ID
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {

  /*
    [get("account/verify_credentials.json") failed]
    TwitterAPIError: 
    {"errors":[{
      "message":"Your credentials do not allow access to this resource","code":220}]}
      refreshすると常に最初に認証を求められる
  */
  const { twitter, TWModal } = useTwitter({
    onSuccess: (user, accessToken) => {
      console.log(user);
      console.log(accessToken);
    }
  });


  const onLoginPress = async () => {
    try {
      await twitter.login();
      const credential = firebase.auth.TwitterAuthProvider
        .credential(ENV.TWITTER_ACCESS_TOKEN, ENV.TWITTER_ACCESS_TOKEN_SECRET);
      return firebase.auth().signInWithCredential(credential);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    twitter.setConsumerKey(ENV.TWITTER_API_KEY, ENV.TWITTER_API_SECRET_KEY);
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLoginPress}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </TouchableOpacity>
      <TWModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
