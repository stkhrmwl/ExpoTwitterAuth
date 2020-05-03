import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// external components
import { useTwitter } from 'react-native-simple-twitter';

// firebase
import firebase from 'firebase';

// secret keys
import ENV from './env.json';

// Initialize Firebase
var firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DATABASE_URL,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
  measurementId: ENV.FIREBASE_MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);

export default function App() {

  const { twitter, TWModal } = useTwitter({
    onSuccess: (user, accessToken) => {
      console.log(user);
      console.log(accessToken);
    }
  });

  const onLoginPress = async () => {
    try {
      await twitter.login();
    } catch (e) {
      console.log(e.errors);
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
